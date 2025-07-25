import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { IoIosArrowUp } from "react-icons/io";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* === BANNER PRINCIPAL === */}
      <div className="relative w-full h-[480px] overflow-hidden">
        <Parallax speed={-40}>
          <img
            src={'https://images.unsplash.com/photo-1588458824535-b940dbbb505a?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt="Bar Banner"
            className="w-full h-full object-cover scale-150"
          />
        </Parallax>
        <div className="absolute inset-0 z-8 flex flex-col justify-center items-center h-full px-4">
          <div className="mb-8">
            <span className="block text-lg font-semibold font-['montserrat'] text-[#660152] text-center">You can</span>
            <h1 className="font-['oswald'] font-semibold text-7xl text-white drop-shadow-md uppercase">
              Contact us
              <span className="text-[#660152]">.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* === SECCIÓN PRINCIPAL === */}
      <div className="py-16 px-6 sm:px-10 w-full max-w-[1400px] mx-auto">
        {/* FORMULARIO */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Formulario */}
        <div>
          <h1 className="text-4xl font-bold text-white font-['oswald'] mb-8 uppercase tracking-wider">
            <span className="text-[#660152] text-lg">please do<br /></span>
            WRITE US <span className="text-[#660152]">.</span>
          </h1>
          <p className="text-gray-300 mb-8">
            We’d love to hear from you! Whether it’s to share your thoughts about our bar, or let us know how much you enjoy our products.
          </p>
          <div className="bg-[#111418] p-8 relative ">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#660152] z-[-1]"></div>
            <h3 className="text-2xl font-bold text-white font-['oswald'] mb-8 uppercase tracking-wider border-b border-[#b76ba3] pb-4">
              Send us a message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="lastname"
                    type="text"
                    placeholder="Last Name"
                    className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                  />
                  <label htmlFor="lastname" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                    Last Name
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="peer h-10 w-full border-b-2 border-[#555] bg-transparent text-white placeholder-transparent focus:outline-none focus:border-[#b76ba3]"
                />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#b76ba3] peer-focus:text-sm">
                  Email Address
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Your Message..."
                  className="peer w-full border-b-2 border-[#555] bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-[#b76ba3] resize-none"
                ></textarea>
                
              </div>
              <button
                type="submit"
                className="w-full bg-[#b76ba3] hover:bg-white text-white hover:text-[#000000] font-normal font-['oswald'] py-4 uppercase tracking-widest transition duration-300 "
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Información de contacto */}
        <div >
          <h1 className="text-4xl font-bold text-white font-['oswald'] mb-8 uppercase tracking-wider">
            <span className="text-[#660152] text-lg">FIND OUR <br /></span> 
            LOCATION <span className="text-[#660152]">.</span>
          </h1>
          <p className="text-gray-300 mb-8">
            Come visit us at our bar. We’re excited to welcome you and share our passion for cocktails and good vibes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto px-4 justify-center  ">
           <div className="space-y-12">
              {/* Dirección */}
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-[#660152] text-3xl mt-1 mr-6 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white font-['oswald'] uppercase tracking-wider mb-4">ADDRESS</h3>
                  <div className="text-gray-300 font-['montserrat'] space-y-2">
                    <p>Carretera Libre Tijuana-Tecate Km 10 Fracc.<br /> El Refugio, Quintas Campestre,<br /> C.P. 22253 Redondo, B.C. </p>
                    
                  </div>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex items-start">
              <FaClock className="text-[#660152] text-3xl mt-1 mr-6 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white font-['oswald'] uppercase tracking-wider mb-4">OPENING HOURS</h3>
                <div className="text-gray-300 font-['montserrat']">
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    <div className="col-span-2 font-medium">Monday</div>
                    <div className="col-span-3 text-[#b76ba3] font-bold font-['oswald']">CLOSED</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    <div className="col-span-2 font-medium">Tue - Thu</div>
                    <div className="col-span-3">03:00 PM -<br /> 12:00 AM</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    <div className="col-span-2 font-medium">Fri - Sat</div>
                    <div className="col-span-3">12:00 PM -<br /> 03:00 AM</div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="col-span-2 font-medium">Sunday</div>
                    <div className="col-span-3">12:00 PM - <br />12:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Columna Derecha */}
            <div className="space-y-12">
              {/* Telefonon */}
              <div className="flex items-start">
                <FaPhone className="text-[#660152] text-3xl mt-1 mr-6 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white font-['oswald'] uppercase tracking-wider mb-4">PHONE</h3>
                  <div className="text-gray-300 font-['montserrat'] space-y-4">
                    <p>
                      Phone: +52 999 888 7676
                    </p>
                    <p>
                      Phone: +52 123 456 9789
                    </p>
                  </div>
                </div>
              </div>
              {/* Correos */}
              <div className="flex items-start pt-17">
                <FaEnvelope className="text-[#660152] text-3xl mt-1 mr-6 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white font-['oswald'] uppercase tracking-wider mb-4">EMAIL</h3>
                  <div className="text-gray-300 font-['montserrat'] space-y-4">
                    <p>
                      <a href="mailto:malbouche25@gmail.com" className="text-white hover:text-[#660152] transition">
                        malbouche25@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            {/* Columna Izquierda */}
           
          </div>
        </div>
        {/* Mapa */}
        <div className="py-12 relative w-full h-[480px] overflow-hidden">
          {/* Mapa */}
          <div className="relative h-full min-h-[600px]">
            <div className="absolute inset-0 bg-[#111418] p-1">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107735.10596568575!2d-116.92605460815858!3d32.453373538751634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d93e743f2e3bd7%3A0xbf19e069ae61d678!2sUniversidad%20Tecnol%C3%B3gica%20de%20Tijuana!5e0!3m2!1ses!2smx!4v1753398454354!5m2!1ses!2smx" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                className="opacity-90 hover:opacity-100 transition duration-300"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#660152] z-[-1]"></div>
          </div>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-[#660152c9] text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-[#b76ba3] transition"
      >
        <IoIosArrowUp size={24} />
      </button>
    </div>
  );
}