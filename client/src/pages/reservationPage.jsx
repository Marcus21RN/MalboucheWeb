import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    cantidadPersonas: '',
    fecha: '',
    horaInicio: '',
    horaFinal: '',
    cliente: '',
    correoCliente: '',
    estado: 'pendiente',
    numeroMesa: ''
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
      alert('Reservación enviada con éxito');
      console.log(response.data);
      setFormData({
        cantidadPersonas: '',
        fecha: '',
        horaInicio: '',
        horaFinal: '',
        cliente: '',
        correoCliente: '',
        estado: 'pendiente',
        numeroMesa: ''
      });
    } catch (error) {
      console.error('Error al enviar la reservación:', error);
      alert('Ocurrió un error al enviar la reservación');
    }
  };

  return (
    <div className="bg-[#080f24] text-[#1f1f1f] min-h-screen pt-16 ">
        <section
          className="relative w-full h-[320px] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage:
              "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')" }}>
          <div className="bg-opacity-10 h-full flex items-center justify-center">
            <h1 className="relative text-4xl md:text-5xl font-bold text-white z-10 text-center px-4">Reservations</h1>
          </div>
          {/* Capa de degradado oscuro (personalizable) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/40 to-transparent" />
        </section>
    
      <div className="bg-[#080f24] max-w-5xl mx-auto py-12 px-4 md:px-8 grid gap-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-10">
          <div>
            <h2 className="text-xl text-center font-semibold mb-4">Fill the reservation form</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <input type="number" name="cantidadPersonas" value={formData.cantidadPersonas} onChange={handleChange} placeholder="Guests" min="1" className="border border-gray-300 rounded-lg p-3" />
              <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="border border-gray-300 rounded-lg p-3" />
              <input type="number" name="numeroMesa" value={formData.numeroMesa} onChange={handleChange} placeholder="Quantity of tables" className="border border-gray-300 rounded-lg p-3" />
            </div>
          </div>

          <div>
            <h2 className="text-xl text-center font-semibold mb-4">Time Selection</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className="border border-gray-300 rounded-lg p-3" />
              <input type="time" name="horaFinal" value={formData.horaFinal} onChange={handleChange} className="border border-gray-300 rounded-lg p-3" />
            </div>
          </div>

          <div>
            <h2 className="text-xl text-center font-semibold mb-4">Customer Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} placeholder="Full name" className="border border-gray-300 rounded-lg p-3" />
              <input type="email" name="correoCliente" value={formData.correoCliente} onChange={handleChange} placeholder="example@example.com" className="border border-gray-300 rounded-lg p-3" />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow">
              Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
