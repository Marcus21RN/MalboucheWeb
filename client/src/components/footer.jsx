import React from "react";
import { Link } from "react-router-dom";
/* import loguimage from "../assets/imagenes/logui.png"; */

export default function Footer() {
  return (
      <>
      {/* Footer Wonderland */}
      <footer className="bg-[#080f24] text-[#F9F4EF] py-6 px-6 md:px-16  shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-m">
          <p>© 2025 Malbouche Bar. All rights reserved.</p>
            <ul className="flex flex-col md:flex-row justify-between items-center gap-1 text-m text-white">
              <p> Extra information? </p>
                        {[
                          { to: "/contact", label: "CONTACT" },
                        ].map((link) => (
                          <li key={link.to} className="relative group">
                            <Link
                              to={link.to}
                              className="text-white font-['Alice'] "
                            >
                              {link.label}
                            </Link> 
                            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#f5c9f9] group-hover:w-full transition-all duration-300"></span>
                          </li>
                        ))}
                      </ul>
        </div>
      </footer>
      </>
  );
}

