import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Parallax } from 'react-scroll-parallax';
import { FaClock } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import sureloj from "../../assets/imagenes/aboutUs.jpg";

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    cantidadPersonas: '',
    fecha: '',
    horaInicio: '',
    nombreCliente: '',
    primerApell: '',
    segundoApell: '',
    correoCliente: '',
    numTel: '',
    estado: 'confirmada',
  });

  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [serverError, setServerError] = useState(null);

  

  // Configurar fechas y horas válidas
  useEffect(() => {
    // Fechas (hoy hasta 1 semana después)
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    setMinDate(today.toISOString().split('T')[0]);
    setMaxDate(nextWeek.toISOString().split('T')[0]);

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    try {
      const reservation = {
        _id: `RES-${Date.now().toString(36).toUpperCase()}`,
        ...formData
      };

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('http://localhost:3000/clientBackend/reservations', reservation);

      await axios.post('http://localhost:3000/clientBackend/email', {
        correoCliente: formData.correoCliente,
        nombreCliente: formData.nombreCliente,
        reservacion: {
          folio: reservation._id,
          fecha: formData.fecha,  
          horaInicio: formData.horaInicio,
          cantidadPersonas: formData.cantidadPersonas,
      }
      });


      alert('Reservation submitted successfully');
      // Reset form
      setFormData({
        cantidadPersonas: '',
        fecha: '',
        horaInicio: '',
        nombreCliente: '',
        primerApell: '',
        segundoApell: '',
        correoCliente: '',
        numTel: '',
        estado: 'confirmada',
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      if (error.response) {
        // Error del servidor con respuesta
        setServerError(error.response.data.message || 'Error submitting reservation');
      } else {
        // Error sin respuesta (problema de red, etc.)
        setServerError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen">
      {/* === BANNER PRINCIPAL === */}
      <div className="relative w-full h-[480px] overflow-hidden">
        <Parallax speed={-40}>
          <img
            src={'https://images.unsplash.com/photo-1709211078586-bf3ad96ccfdb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt="Bar Banner"
            className="w-full h-full object-cover scale-150"
          />
        </Parallax>
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center h-full px-4">
          <div className="mb-8">
            <h1 className="font-['oswald'] font-semibold text-7xl tracking-wider text-white drop-shadow-lg">
              <span className="block text-lg font-semibold font-[montserrat] text-[#660152]">MAKE YOUR</span>
              RESERVATION
              <span className="text-[#660152]">.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <div className="py-16 px-6 sm:px-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
          {/* Sección del Formulario */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="text-xl font-['oswald'] font-bold text-start mb-2 text-[#660152]">
                OUR
              </h1>
              <h2 className="text-white text-5xl font-['oswald'] mb-2">
                RESERVATION FORM <span className="text-[#660152] text-5xl">.</span>
              </h2>
              <p className="text-lg font-['montserrat'] text-white">
                Please fill out the form below to make a reservation at our bar. We look forward to welcoming you!
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-[#111418] shadow-2xl p-8 md:p-10 space-y-12">
              {serverError && (
                <div className="text-red-500 text-center mb-4">
                  {serverError}
                </div>
              )}

              {/* Reservation Details */}
              <section>
                <h2 className="text-2xl font-['oswald'] font-semibold text-white border-b-2 border-[#660152]/50 pb-2 mb-6 uppercase">
                  Details
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative w-full">
                    <input
                      type="number"
                      name="cantidadPersonas"
                      value={formData.cantidadPersonas}
                      onChange={handleChange}
                      placeholder=" "
                      min="1"
                      max="4"
                      required
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Number of Guests
                    </label>
                  </div>
                  
                  <div className="relative w-full">
                    <input
                      type="date" 
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      min={minDate}
                      max={maxDate}
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3] 
               [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-100 [&::-webkit-calendar-picker-indicator]:hover:brightness-200"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Date
                    </label>
                  </div>
                  
                  <div className="relative w-full md:col-span-2">
                    <input
                      type="time"
                      name="horaInicio"
                      value={formData.horaInicio}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      min="15:00"
                      max="23:59"
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]
                       [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-100 [&::-webkit-calendar-picker-indicator]:hover:brightness-200"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Arrival Time
                    </label>
                  </div>
                </div>
              </section>
              
              {/* Personal Information */}
              <section>
                <h2 className="text-2xl font-['oswald'] font-semibold text-white border-b-2 border-[#660152]/50 pb-2 mb-6 uppercase">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { label: 'First Name', name: 'nombreCliente', placeholder: 'e.g. John' },
                    { label: 'First Last Name', name: 'primerApell', placeholder: 'e.g. Smith' },
                    { label: 'Second Last Name', name: 'segundoApell', placeholder: 'e.g. Johnson' },
                  ].map(({ label, name }) => (
                    <div key={name} className="relative w-full">
                      <input
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="relative mt-8 grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      type="email"
                      name="correoCliente"
                      value={formData.correoCliente}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="numTel"
                      value={formData.numTel}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Phone Number
                    </label>
                  </div>
                </div>
              </section>
              
              {/* Submit */}
              <div className="pt-6 text-center">
                <button
                  type="submit"
                  className="w-full bg-[#b76ba3] hover:bg-white text-white hover:text-[#000000] font-normal font-['oswald'] py-4 uppercase tracking-widest transition duration-300"
                >
                  SUBMIT
                </button> 
              </div>
            </form>
          </div>
          
          {/* Sección de la Imagen */}
          <div className="order-1 lg:order-2 h-full flex items-center justify-center pt-40">
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-sm group">
              <img
                src={sureloj}
                alt="Reloj surrealista"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <FaClock className="text-4xl text-[#b76ba3] mb-2" />
                <h3 className="text-2xl font-['oswald'] font-bold">Reserve Your Moment</h3>
                <p className="font-['montserrat']">We'll keep your time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botón para volver arriba */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-[#660152c9] text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-[#b76ba3] transition"
      >
        <IoIosArrowUp size={24} />
      </button>
    </div>
  );
}