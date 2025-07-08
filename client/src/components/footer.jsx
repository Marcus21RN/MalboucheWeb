import React from "react";
import { Link } from "react-router-dom";
/* import loguimage from "../assets/imagenes/logui.png"; */

export default function Footer() {
  return (
      <>
      {/* Footer Wonderland */}
      <footer className="bg-[#080f24] text-[#F9F4EF] py-6 px-6 md:px-16  shadow-inner">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 Malbouche Bar. All rights reserved.</p>
            <p className="flex items-center gap-1">
                🌸 Made with wonder • 🃏 Follow the white rabbit
            </p>
        </div>
      </footer>
      </>
  );
}

