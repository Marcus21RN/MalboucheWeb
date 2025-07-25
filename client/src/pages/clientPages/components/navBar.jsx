  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { FaBars, FaTimes } from "react-icons/fa";

  export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const navLinks = [
      { to: "/", label: "Home" },
      { to: "/menu", label: "Menu" },
      { to: "/events", label: "Events" },
      { to: "/contact", label: "Contact" },
      {
        to: "/reservations",
        label: "BOOK A TABLE",
        special: true
      },
    ];

    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-4 transition-all duration-300 ${
          isScrolled ? "bg-[#000000] shadow-lg  " : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo - Añade tu logo aquí si lo tienes */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white font-[oswald] tracking-widest">
              MALBOUCHE
            </Link>
          </div>

          {/* Menú Desktop (hidden en móviles) */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-12 font-['montserrat'] font-normal">
            {navLinks.map((link) => (
              <li key={link.to} className="relative group">
                <Link
                  to={link.to}
                  className={`
                    transition duration-200 px-2 py-1
                    ${link.special 
                      ? "px-4 py-2 mx-4 border-white font-[oswald] border-2 text-white font-normal tracking-widest hover:bg-[#660154] hover:border-[#660154] hover:text-[#000000]" 
                      : "hover:text-[#b76ba3] font-[montserrat] text-white font-semibold text-lg tracking-widest"
                    }
                  `}
                >
                  {link.label}
                </Link>
                {!link.special && (
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-0 h-[2px] bg-[#660154] group-hover:w-4/5 transition-all duration-300"></span>
                )}
              </li>
            ))}
          </ul>

          {/* Botón Hamburguesa (solo móvil) */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menú Móvil */}
        <div
          className={`md:hidden fixed top-20 left-0 right-0 bg-[#1e2329] shadow-xl transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col items-center py-4 space-y-6">
            {navLinks.map((link) => (
              <li key={link.to} className="w-full text-center">
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block py-3 px-4 transition duration-200
                    ${link.special 
                      ? "mx-4 border-white font-[oswald] border-2 text-white font-normal tracking-widest hover:bg-[#660154] hover:border-[#660154] hover:text-[#1e2329]" 
                      : "text-white hover:text-[#b76ba3] font-medium"
                    }
                  `}
                >
                  {link.label}
                </Link>
                {!link.special && (
                  <div className="border-b border-gray-700 w-3/4 mx-auto"></div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }