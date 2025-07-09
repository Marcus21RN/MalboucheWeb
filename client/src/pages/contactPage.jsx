import React from 'react';

export default function contactPage() {
  return (
    <div className="min-h-screen bg-[#080f24] pt-16">
      
      {/* === BANNER PRINCIPAL === */}
      <div className="relative w-full h-[400px] overflow-hidden">
        {/* Imagen de fondo desenfocada */}
        <div
          className="absolute inset-0 bg-center bg-cover scale-105 blur-xs"
          style={{ backgroundImage: "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/20 to-transparent" />

        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <h1 className="mb-2 font-['Alice'] font-semibold text-7xl not-italic text-amber-50 drop-shadow-md">
              CONTACT WITH US
            </h1>
            <p className="text-2xl text-[#FFE3A9] font-['Cormorant'] font-normal not-italic drop-shadow-sm">
              Step into our wonderland and share your thoughts
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 px-6 bg-[#080f24]">
        {/* === TÍTULO DE SECCIÓN === */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-['Alice'] text-[#FFE3A9] mb-4 tracking-wider">
            GET IN TOUCH
          </h2>
          <div className="border-t border-[#725CAD]/50 w-1/3 mx-auto"></div>
        </div>

        {/* === SECCIÓN DE INFORMACIÓN PRINCIPAL (Dirección, Contacto, Horarios) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">

          {/* Dirección */}
          <div className="bg-[#0f122e] rounded-lg p-6 shadow-md hover:shadow-[0_0_20px_#725CAD80] transform hover:scale-105 transition duration-500">
            <h3 className="font-bold text-lg mb-4 text-[#FFE3A9] font-['Alice']">Address</h3>
            <p className="mb-2 text-amber-50 font-['Cormorant']">
              Calle del Conejo Blanco #123
            </p>
            <p className="mb-2 text-amber-50 font-['Cormorant']">
              Colonia Wonderland, <span className="text-[#FFE3A9]">Mérida, Yucatán</span>
            </p>
            <p className="text-amber-50 font-['Cormorant']">C.P. 97000, México</p>
          </div>

          {/* Detalles de Contacto */}
          <div className="bg-[#0f122e] rounded-lg p-6 shadow-md hover:shadow-[0_0_20px_#725CAD80] transform hover:scale-105 transition duration-500">
            <h3 className="font-bold text-lg mb-4 text-[#FFE3A9] font-['Alice']">Contact Details</h3>
            <p className="mb-2 text-amber-50 font-['Cormorant']">
              <span className="font-semibold text-[#FFE3A9]">Phone:</span> +52 999 888 7676
            </p>
            <p className="text-amber-50 font-['Cormorant']">
              <span className="font-semibold text-[#FFE3A9]">Email:</span> 
              <a href="mailto:contact@wonderlandbar.com" className="text-[#D2B48C] hover:text-[#FFE3A9] transition duration-300 ml-1">
                contact@wonderlandbar.com
              </a>
            </p>
          </div>

          {/* Horarios */}
          <div className="bg-[#0f122e] rounded-lg p-6 shadow-md hover:shadow-[0_0_20px_#725CAD80] transform hover:scale-105 transition duration-500">
            <h3 className="font-bold text-lg mb-4 text-[#FFE3A9] font-['Alice']">Opening Hours</h3>
            <p className="mb-2 text-amber-50 font-['Cormorant']">
              <span className="font-semibold text-[#FFE3A9]">Mon - Thu:</span> 18:00 - 01:00
            </p>
            <p className="text-amber-50 font-['Cormorant']">
              <span className="font-semibold text-[#FFE3A9]">Fri - Sat:</span> 18:00 - 03:00
            </p>
          </div>

        </div>

        {/* === SEPARADOR DECORATIVO === */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-t border-[#725CAD]/70 w-3/12"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#080f24] px-4 font-['Alice'] text-[#FFE3A9]">
              ✧
            </span>
          </div>
        </div>

        {/* === SECCIÓN DE UBICACIÓN Y FORMULARIO === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Mapa o Imagen de Ubicación */}
          <div className="bg-[#0f122e] p-6 rounded-lg shadow-md hover:shadow-[0_0_20px_#725CAD80] transform hover:scale-105 transition duration-500 flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-[#FFE3A9] font-['Alice'] mb-4">Find Our Wonderland</h3>
            <div className="w-full h-64 bg-[#725CAD]/20 flex items-center justify-center rounded-md relative border border-[#725CAD]/30">
              <div className="w-10 h-10 bg-[#FFE3A9] rounded-full flex items-center justify-center text-[#080f24] text-lg shadow-md z-10">
                📍
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-[#FFE3A9] text-[#080f24] font-semibold font-['Alice'] rounded shadow hover:bg-[#D2B48C] transition duration-300">
              View on Map
            </button>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-[#0f122e] border-t-4 border-[#FFE3A9] shadow-lg rounded-lg p-6 hover:shadow-[0_0_20px_#725CAD80] transition duration-500">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#725CAD] to-[#FFE3A9] text-white px-4 py-2 rounded-t-md mb-4 font-['Alice']">
              Send us a message
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-[#FFE3A9] font-['Alice']">Name</label>
                <input 
                  type="text" 
                  placeholder="Your magical name..." 
                  className="w-full border border-[#725CAD]/30 rounded px-3 py-2 bg-[#080f24] text-amber-50 placeholder-amber-50/50 focus:outline-none focus:ring-2 focus:ring-[#FFE3A9] focus:border-[#FFE3A9] transition duration-300" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#FFE3A9] font-['Alice']">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Your family name..." 
                  className="w-full border border-[#725CAD]/30 rounded px-3 py-2 bg-[#080f24] text-amber-50 placeholder-amber-50/50 focus:outline-none focus:ring-2 focus:ring-[#FFE3A9] focus:border-[#FFE3A9] transition duration-300" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#FFE3A9] font-['Alice']">Email Address</label>
                <input 
                  type="email" 
                  placeholder="your.email@wonderland.com" 
                  className="w-full border border-[#725CAD]/30 rounded px-3 py-2 bg-[#080f24] text-amber-50 placeholder-amber-50/50 focus:outline-none focus:ring-2 focus:ring-[#FFE3A9] focus:border-[#FFE3A9] transition duration-300" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-[#FFE3A9] font-['Alice']">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Share your wonderland experience, suggestions, or any feedback..." 
                  className="w-full border border-[#725CAD]/30 rounded px-3 py-2 bg-[#080f24] text-amber-50 placeholder-amber-50/50 focus:outline-none focus:ring-2 focus:ring-[#FFE3A9] focus:border-[#FFE3A9] transition duration-300 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#FFE3A9] hover:bg-[#D2B48C] text-[#080f24] font-bold font-['Alice'] py-2 rounded transition duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
