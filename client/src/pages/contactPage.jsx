import React from 'react';

export default function contactPage() {
  return (
    <div className="bg-yellow-100 min-h-screen py-12 px-6">

      {/* === TÍTULO DE CONTACTO === */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        CONTACT WITH US
        <div className="flex justify-center mt-2">
          <span className="w-24 h-1 bg-yellow-400 rounded"></span>
        </div>
      </h2>

      {/* === SECCIÓN DE INFORMACIÓN PRINCIPAL (Dirección, Contacto, Horarios) === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

        {/* Dirección */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Address</h3>
          <p className="mb-2">
            A paragraph text with an <a href="#" className="underline text-orange-500">underlined link</a>
          </p>
          <p className="mb-2">
            Another text block with a <a href="#" className="text-orange-500">link with color</a>
          </p>
          <p>An even different text here.</p>
        </div>

        {/* Detalles de Contacto */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Contact details</h3>
          <p><span className="font-semibold">Phone Number:</span> +52 999 888 7676</p>
          <p><span className="font-semibold">Email:</span> <a href="mailto:contact@wonderlandbar.com" className="text-orange-500">contact@wonderlandbar.com</a></p>
        </div>

        {/* Horarios */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Opening Time</h3>
          <p><span className="font-semibold">Mon - Thu:</span> 18:00 - 01:00</p>
          <p><span className="font-semibold">Fri - Sat:</span> 18:00 - 03:00</p>
        </div>

      </div>

      {/* === SECCIÓN DE UBICACIÓN Y FORMULARIO === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Mapa o Imagen de Ubicación */}
        <div className="bg-orange-100 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Find Our Wonderland</h3>
          <div className="w-full h-64 bg-orange-200 flex items-center justify-center rounded-md relative">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white text-lg shadow-md z-10">
              📍
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-white text-blue-900 font-semibold rounded shadow hover:bg-blue-50 transition">
            Wonderland Bar Location
          </button>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-white border-t-4 border-yellow-400 shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-900 to-blue-600 text-white px-4 py-2 rounded-t-md mb-4">Send us an email</h3>
          <form className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input type="text" placeholder="Your magical name..." className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Last Name</label>
              <input type="text" placeholder="Your family name..." className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <input type="email" placeholder="your.email@wonderland.com" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Message</label>
              <textarea rows="4" placeholder="Share your wonderland experience, suggestions, recommendations, or any feedback..." className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
