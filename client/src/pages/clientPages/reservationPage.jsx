
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Parallax } from 'react-scroll-parallax';
import { FaClock } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import sureloj from "../../assets/imagenes/aboutUs.jpg";
import { Snackbar, Alert } from '@mui/material';

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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  

  // Configurar fechas y horas válidas
  useEffect(() => {
    // Fechas (hoy hasta 1 mes después)
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    setMinDate(today.toISOString().split('T')[0]);
    setMaxDate(nextMonth.toISOString().split('T')[0]);
  }, []);


  // Validaciones en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let errorMsg = '';

    if (name === 'cantidadPersonas') {
      // Solo números, máximo 20
      if (Number(newValue) > 20) {
        errorMsg = 'The reservation limit is 20 guests per reservation.';
        newValue = '20';
      } else if (Number(newValue) !== '' && Number(newValue) < 1) {
        errorMsg = 'You must reserve for at least 1 guest.';
      }
      if (!/^\d*$/.test(newValue)) {
        errorMsg = 'Only numbers are allowed.';
        newValue = newValue.replace(/\D/g, '');
      }
    }

    if (["nombreCliente", "primerApell", "segundoApell"].includes(name)) {
      // Only letters and spaces
      if (/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/.test(newValue)) {
        errorMsg = 'Only letters and spaces are allowed.';
        newValue = newValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
      }
    }

    if (name === 'numTel') {
      // Only numbers
      if (/[^0-9]/.test(newValue)) {
        errorMsg = 'Only numbers are allowed.';
        newValue = newValue.replace(/\D/g, '');
      }
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    if (errorMsg) {
      setSnackbar({ open: true, message: errorMsg, severity: 'error' });
    }
  };


  // Validación de email
  const isValidEmail = (email) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  // Validación antes de enviar
  const validateForm = () => {
    const newErrors = {};
    if (!formData.cantidadPersonas || Number(formData.cantidadPersonas) < 1 || Number(formData.cantidadPersonas) > 20) {
      newErrors.cantidadPersonas = 'The number of guests must be between 1 and 20.';
    }
    if (!formData.fecha) {
      newErrors.fecha = 'Please select a date.';
    }
    if (!formData.horaInicio) {
      newErrors.horaInicio = 'Please select an arrival time.';
    }
    ["nombreCliente", "primerApell", "segundoApell"].forEach(field => {
      if (!formData[field] || /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/.test(formData[field])) {
        newErrors[field] = 'Only letters and spaces are allowed.';
      }
    });
    if (!formData.correoCliente || !isValidEmail(formData.correoCliente)) {
      newErrors.correoCliente = 'Please enter a valid email address.';
    }
    if (!formData.numTel || /[^0-9]/.test(formData.numTel)) {
      newErrors.numTel = 'Only numbers are allowed.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSnackbar({ open: true, message: Object.values(newErrors)[0], severity: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const reservation = {
        _id: `RES-${Date.now().toString(36).toUpperCase()}`,
        ...formData
      };

      await axios.post('http://localhost:3000/clientBackend/reservations', reservation);

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

      setSnackbar({ open: true, message: 'Reservation submitted successfully!', severity: 'success' });
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
      setErrors({});
    } catch (error) {
      let message = 'Could not complete the reservation. Please try again later.';
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      setSnackbar({ open: true, message, severity: 'error' });
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


              {/* Reservation Details */}
              <section>
                <h2 className="text-2xl font-['oswald'] font-semibold text-white border-b-2 border-[#660152]/50 pb-2 mb-6 uppercase">
                  Details
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative w-full">
                    <input
                      id="cantidadPersonas"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="cantidadPersonas"
                      value={formData.cantidadPersonas}
                      onChange={handleChange}
                      onInput={e => {
                        // Elimina cualquier caracter no numérico en tiempo real
                        e.target.value = e.target.value.replace(/\D/g, '');
                      }}
                      placeholder=" "
                      min="1"
                      max="20"
                      required
                      autoComplete="off"
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                    />
                    <label htmlFor="cantidadPersonas" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all cursor-text peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Number of Guests
                    </label>
                  </div>
                  
                  <div className="relative w-full">
                    <input
                      id="fecha"
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
                    <label htmlFor="fecha" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all cursor-text peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Date
                    </label>
                  </div>
                  
                  <div className="relative w-full md:col-span-2">
                    <input
                      id="horaInicio"
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
                    <label htmlFor="horaInicio" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all cursor-text peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
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
                        id={name}
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder=" "
                        required
                        className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                      />
                      <label htmlFor={name} className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all cursor-text peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="relative mt-8 grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input
                      id="correoCliente"
                      type="email"
                      name="correoCliente"
                      value={formData.correoCliente}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                    />
                    <label htmlFor="correoCliente" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all cursor-text peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="numTel"
                      type="tel"
                      name="numTel"
                      value={formData.numTel}
                      onChange={handleChange}
                      placeholder=" "
                      maxLength={10} 
                      required
                      className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                    />
                    <label htmlFor="numTel" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all cursor-text peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
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

      {/* Snackbar de MUI para mensajes de error y éxito */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%', fontWeight: 500, fontFamily: 'montserrat' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}