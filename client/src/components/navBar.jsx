import React from "react";
import { Link } from "react-router-dom";
/* import loguimage from "../assets/imagenes/logui.png"; */

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-10 py-8 shadow-lg bg-[#080f24]">
      <div className="container flex items-center mx-auto my-auto">
        {/* Contenedor centrado para los links */}
        <div className="absolute transform -translate-x-1/2 left-1/2">
          <ul className="flex gap-20 font-['Alice'] text-accent">
            {[
              { to: "/", label: "HOME" }, 
              { to: "/menu", label: "MENU" },
              { to: "/events", label: "EVENTS" },
              { to: "/reservations", label: "RESERVATIONS" },
              { to: "/contact", label: "CONTACT" },
            ].map((link) => (
              <li key={link.to} className="relative group">
                <Link
                  to={link.to}
                  className="transition duration-200 hover:text-[#FFE3A9] text-[#725CAD] font-semibold "
                >
                  {link.label}
                </Link> 
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#8CCDEB] group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
}