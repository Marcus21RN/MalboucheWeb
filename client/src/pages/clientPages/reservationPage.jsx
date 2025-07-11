import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    cantidadPersonas: '',
    fecha: '',
    horaInicio: '',
    nombreCliente: '',
    primerApell: '',
    segundoApell: '',
    correoCliente: '',
    estado: 'pendiente',
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservation = {
        _id: uuidv4(),
        ...formData
      };

      const response = await axios.post('http://localhost:3000/api/reservations', reservation);
      alert('Reservation submitted successfully');
      console.log(response.data);
      setFormData({
        cantidadPersonas: '',
        fecha: '',
        horaInicio: '',
        nombreCliente: '',
        primerApell: '',
        segundoApell: '',
        correoCliente: '',
        estado: 'pendiente',
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Error submitting reservation');
    }
  };

  return (
    <div className="bg-[#080f24] text-[#FFE3A9] min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-xs"
          style={{ 
            backgroundImage: "url('https://www.juliacharleseventmanagement.co.uk/wp-content/uploads/2019/10/Alice-In-Wonderland-Tea-Cups-600x300.jpg')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/70 to-transparent" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <h1 className="mb-2 font-['Alice'] font-semibold text-7xl text-amber-50 drop-shadow-md">
              Book Your Experience
            </h1>
            <p className="text-2xl text-[#FFE3A9] font-['Cormorant'] font-bold drop-shadow-sm">
              & follow the White Rabbit
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-4xl mx-auto py-16 px-4 md:px-8">
        <form onSubmit={handleSubmit} className="bg-[#0f122e] border border-[#725CAD]/50 rounded-xl shadow-2xl p-8 md:p-10 space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-['Alice'] font-semibold text-[#FFE3A9] border-b border-[#725CAD]/50 pb-2">
              Reservation Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-['Cormorant'] text-[#8CCDEB] mb-2 font-bold text-xl">Number of Guests</label>
                <input 
                  type="number" 
                  name="cantidadPersonas" 
                  value={formData.cantidadPersonas} 
                  onChange={handleChange} 
                  placeholder="e.g. 2" 
                  min="1" 
                  className="w-full bg-[#080f24] border border-[#725CAD]/50 rounded-lg p-3 text-[#FFE3A9] focus:border-[#FFE3A9] focus:ring-1 focus:ring-[#FFE3A9]"
                  required
                />
              </div>
              <div>
                <label className="block font-['Cormorant'] text-[#8CCDEB] mb-2 font-bold text-xl">Date</label>
                <input 
                  type="date" 
                  name="fecha" 
                  value={formData.fecha} 
                  onChange={handleChange} 
                  className="w-full bg-[#080f24] border border-[#725CAD]/50 rounded-lg p-3 text-[#FFE3A9] focus:border-[#FFE3A9] focus:ring-1 focus:ring-[#FFE3A9]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-['Alice'] font-semibold text-[#FFE3A9] border-b border-[#725CAD]/50 pb-2">
              Time Selection
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-['Cormorant'] text-[#8CCDEB] mb-2 font-bold text-xl">Arrival Time</label>
                <input 
                  type="time"  
                  name="horaInicio" 
                  value={formData.horaInicio} 
                  onChange={handleChange} 
                  className="w-full bg-[#080f24] border border-[#725CAD]/50 rounded-lg p-3 text-[#FFE3A9] focus:border-[#FFE3A9] focus:ring-1 focus:ring-[#FFE3A9]"
                  required
                />
              </div>
              <div className="rounded-lg p-4 text-center border-b-2 border-[#8CCDEB]/40 bg-[#080f24]">
                <h3 className="font-bold text-lg mb-4 text-amber-50 font-['Alice']">Opening Hours</h3>
                <p className="mb-2 text-[#FFE3A9] font-['Cormorant']">
                  <span className="font-semibold text-[#8CCDEB]">Mon - Thu:</span> 18:00 - 01:00
                </p>
                <p className="text-[#FFE3A9] font-['Cormorant']">
                  <span className="font-semibold text-[#8CCDEB]">Fri - Sat:</span> 18:00 - 03:00
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-['Alice'] font-semibold text-[#FFE3A9] border-b border-[#725CAD]/50 pb-2">
              Personal Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block font-['Cormorant'] text-[#8CCDEB] mb-2 font-bold text-xl">First Name</label>
                <input 
                  type="text" 
                  name="nombreCliente" 
                  value={formData.nombreCliente} 
                  onChange={handleChange} 
                  placeholder="e.g. John" 
                  className="w-full bg-[#080f24] border border-[#725CAD]/50 rounded-lg p-3 text-[#FFE3A9] focus:border-[#FFE3A9] focus:ring-1 focus:ring-[#FFE3A9]"
                  required
                />
              </div>
              <div>
                <label className="block font-['Cormorant'] text-[#8CCDEB] mb-2 font-bold text-xl">First Last Name</label>
                <input 
                  type="text" 
                  name="primerApell" 
                  value={formData.primerApell} 
                  onChange={handleChange} 
                  placeholder="e.g. Smith" 
                  className="w-full bg-[#080f24] border border-[#725CAD]/50 rounded-lg p-3 text-[#FFE3A9] focus:border-[#FFE3A9] focus:ring-1 focus:ring-[#FFE3A9]"
                  required
                />
              </div>
              <div>
                <label className="block font-['Cormorant'] text-[#8CCDEB] mb-2 font-bold text-xl">Second Last Name</label>
                <input 
                  type="text" 
                  name="segundoApell" 
                  value={formData.segundoApell} 
                  onChange={handleChange} 
                  placeholder="e.g. Johnson" 
                  className="w-full bg-[#080f24] border border-[#725CAD]/50 rounded-lg p-3 text-[#FFE3A9] focus:border-[#FFE3A9] focus:ring-1 focus:ring-[#FFE3A9]"
                  required
                />
              </div>

            </div>
            <div>
              <label className="block font-['Cormorant'] text-[#8CCDEB] mb-2 font-bold text-xl">Email Address</label>
              <input 
                type="email" 
                name="correoCliente" 
                value={formData.correoCliente} 
                onChange={handleChange} 
                placeholder="example@email.com" 
                className="w-full bg-[#080f24] border border-[#725CAD]/50 rounded-lg p-3 text-[#FFE3A9] focus:border-[#FFE3A9] focus:ring-1 focus:ring-[#FFE3A9]"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 text-center">
            <button 
              type="submit" 
              className="bg-[#725CAD] hover:bg-[#8A6FDF] text-[#FFE3A9] font-['Alice'] font-bold py-3 px-10 rounded-full text-lg "
            >
              Confirm Reservation
            </button>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-16">
          <span className="text-2xl text-[#725CAD] animate-pulse">✦ ✦ ✦</span>
        </div>
      </div>
    </div>
  );
}