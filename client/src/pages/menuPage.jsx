// src/pages/MenuPage.jsx

// src/pages/MenuPage.jsx
import React, { useState } from "react";

const menuData = {
  "Pócimas Mágicas": [
    { 
      nombre: "ELIXIR DE LA REINA ROJA", 
      ingredientes: "Ginebra, jugo de granada, especias secretas, limón fresco lorem impsum dolor sit amet lorem  ",
      precio: "$130.00 MXN" 
    },
    { 
      nombre: "TÉ DEL SOMBRERERO LOCO", 
      ingredientes: "Té negro, ron especiado, miel, limón fresco",
      precio: "$120.00 MXN" 
    },
    { 
      nombre: "LÁGRIMAS DEL FÉNIX", 
      ingredientes: "Mezcal, aperol, jugo de piña, lima fresca",
      precio: "$145.00 MXN" 
    }
  ],
  "Delicias del País": [
    { 
      nombre: "EMPAREDADO DEL RELOJ", 
      ingredientes: "Pan de centeno, jamón serrano, queso brie, mostaza miel",
      precio: "$160.00 MXN" 
    },
    { 
      nombre: "TARTA DE TIEMPO CONGELADO", 
      ingredientes: "Chocolate blanco, frambuesas, crema de vainilla",
      precio: "$95.00 MXN" 
    }
  ]
};

export default function MenuPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Pócimas Mágicas");

  return (
    <div className="min-h-screen bg-[#080f24] py-12 px-4 sm:px-8 text-[#FFE3A9]">
        <div className="relative w-full h-[500px] overflow-hidden">
            {/* Imagen de fondo desenfocada */}
            <div
              className="absolute inset-0 bg-center bg-cover scale-105 blur-xs"
              style={{ backgroundImage: "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/20 to-transparent" />

            <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
              <div>
                <h1 className="mb-2 font-['Alice'] font-semibold text-7xl not-italic text-amber-50 drop-shadow-md">
                    Magical Bites & Sips
                </h1>
                <p className="text-2xl text-[#FFE3A9] font-['Cormorant'] font-normal  not-italic drop-shadow-sm">
                 Drink me. Eat me. Lose yourself.
                </p>
              </div>
            </div>
          </div>


      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl font-bold font-['Alice'] mt-5 mb-4 tracking-wider">
           MENU 
        </h1>
        <div className="border-t border-[#725CAD]/50 w-1/3 mx-auto"></div>
      </div>

      {/* Navegación */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {Object.keys(menuData).map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaActiva(categoria)}
            className={`px-6 py-2 text-lg transition-all duration-300 font-['Alice'] ${
              categoriaActiva === categoria
                ? "text-[#FFE3A9] border-b-2 border-[#FFE3A9]"
                : "text-[#8CCDEB] hover:text-[#FFE3A9]"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {menuData[categoriaActiva].map((item, index) => (
          <div key={index} className="mb-8">
            <div className="flex justify-between items-baseline mb-1">
              <h2 className="text-2xl font-['Alice'] font-bold tracking-wider text-[#FFE3A9] w-85">
                {item.nombre}
              </h2>
              <span className="text-lg font-['Cormorant'] text-[#D2B48C] mr-10">
                {item.precio}
              </span>
            </div>
            <p className="text-[#8CCDEB] font-['Cormorant'] italic w-80 ">
              {item.ingredientes}
            </p>
          </div>
        ))}
      </div>
      {/* Decoración final */}
      <div className="flex justify-center mt-16">
        <span className="text-2xl text-[#725CAD] animate-pulse">✦ ✦ ✦</span>
      </div>
    </div>
  );
}