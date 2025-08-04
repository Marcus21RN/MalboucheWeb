import React from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/imagenes/logui.png"; 
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="bg-[#000000] text-[#F9F4EF] px-6 md:px-16 py-10 shadow-inner"
    >
      {/* Contenedor principal centrado */}
      <div className="max-w-7xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm md:text-base justify-items-center">
          {/* Horarios */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold tracking-wide font-['oswald'] mb-4 text-[#F9F4EF]">
              OPENING HOURS<span className="text-[#b76ba3]">.</span>
            </h2>
            <ul className="space-y-1 font-['montserrat']">
              <li className="flex max-w-xs mx-auto md:mx-0">
                <span>Mon ....................</span>
                <span className="text-[#e16eab] font-bold font-['oswald']">  CLOSED</span>
              </li>
              <li className="flex  max-w-xs mx-auto md:mx-0">
                <span>Tue - Thu </span>
                <span> ......... 03:00 PM - 12:00 AM</span>
              </li>
              <li className="flex  max-w-xs mx-auto md:mx-0">
                <span>Fri - Sat</span>
                <span> .............. 12:00 PM - 03:00 AM</span>
              </li>
              <li className="flex  max-w-xs mx-auto md:mx-0">
                <span>Sun</span>
                <span> ...................... 12:00 PM - 12:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold tracking-wide font-['oswald'] mb-4 text-[#F9F4EF]">
              CONTACT US<span className="text-[#b76ba3]">.</span>
            </h2>
            <ul className="space-y-1 font-['montserrat']">
              <li>Email: malbouche25@gmail.com</li>
              <li>Phone: +52 123 456 9789</li>
            </ul>
          </div>

          {/* Ubicación */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold tracking-wide font-['oswald'] mb-4 text-[#F9F4EF]">
              LOCATION<span className="text-[#b76ba3]">.</span>
            </h2>
            <p className="font-['montserrat']">Carretera Libre<br /> Tijuana-Tecate Km 10 Fracc.<br /> El Refugio, Quintas Campestre,<br /> C.P. 22253 Redondo, B.C.  </p>
          </div>

          {/* Redes sociales */}
          <div className="text-center">
            <h2 className="text-lg font-bold tracking-wide font-['oswald'] mb-4 text-[#F9F4EF]">
              FOLLOW US<span className="text-[#b76ba3]">.</span>
            </h2>
            <div className="flex justify-center gap-4">
              <motion.a whileHover={{ scale: 1.2 }} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-2xl text-white hover:text-[#b76ba3] transition" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl text-white hover:text-[#b76ba3] transition" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl text-white hover:text-[#b76ba3] transition" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-2xl text-white hover:text-[#b76ba3] transition" />
              </motion.a>
            </div>
          </div>
        </section>

        {/* Línea divisora */}
        <div className="my-6 border-t border-[#660152]"></div>

        {/* Derechos de autor y logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center text-sm md:text-base font-['montserrat'] text-[#c5a2bb]">
            © 2025 Malbouche Bar. All rights reserved.
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={logo}
              alt="Malbouche Logo"
              className="h-20 object-contain"
            />
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}