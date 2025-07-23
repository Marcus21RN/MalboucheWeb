import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-10 py-8 transition-all duration-300 ${
        isScrolled ? "bg-[#1e2329] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex justify-end mx-auto"> {/* Cambiado a justify-end */}
        <ul className="flex items-center gap-12 font-['montserrat'] font-normal text-accent text-lg">
          {[
            { to: "/", label: "Home" },
            { to: "/menu", label: "Menu" },
            { to: "/events", label: "Events" },
            { to: "/contact", label: "Contact" },
            {
              to: "/reservations",
              label: "BOOK A TABLE",
              special: true // Marca este item como especial
            },
          ].map((link) => (
            <li key={link.to} className="relative group">
              <Link
                to={link.to}
                className={`
                  transition duration-200 
                  ${link.special 
                    ? "px-4 py-2 text-lg border-1 text-white border-white hover:border-[#660154] hover:text-[#b76ba3]" 
                    : "hover:text-[#b76ba3] text-[#fff]"
                  }
                  font-semibold
                `}
              >
                {link.label}
              </Link>
              {!link.special && (
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#660154] group-hover:w-full transition-all duration-300"></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}