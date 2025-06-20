import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-yellow-100 shadow-lg py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-600 tracking-wide">
          Wonderland Bar
        </div>

        {/* Links */}
        <ul className="flex gap-6 text-blue-900 font-semibold">
          {[
            { to: "/", label: "HOME" },
            { to: "/menu", label: "MENU" },
            { to: "/events", label: "EVENTS" },
            { to: "/reservations", label: "RESERVATIONS" },
            { to: "/contact", label: "CONTACT" },
            { to: "/login", label: "LOG IN" },
          ].map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                className="hover:text-blue-400 transition duration-200"
              >
                {link.label}
              </Link>
              {/* Underline on hover */}
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-blue-300 group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
