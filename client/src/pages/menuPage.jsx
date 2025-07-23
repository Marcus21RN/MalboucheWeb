// src/pages/MenuPage.jsx

// src/pages/MenuPage.jsx
import React, { useState } from "react";
/* import barImage from "../assets/imagenes/bar5.jpg"; */


const menuData = {
  "Potions & Elixirs": [
    { 
      nombre: "Mad Hatter Mojito",
      ingredientes: "Ron, crema de coco y jugo de piña",
      precio: "$130.00 MXN" 
    },
    { 
      nombre: "White Rabbit Shot",
      ingredientes: "Ron, crema de coco y jugo de piña",
      precio: "$120.00 MXN" 
    },
    { 
      nombre: "Queen’s Sour Elixir",
      ingredientes: "Whiskey, jugo de limón y jarabe simple",
      precio: "$145.00 MXN" 
    },
    { 
      nombre: "Cheshire Cat Martini",
      ingredientes: "Vodka, licor de melón y jugo de arándano",
      precio: "$150.00 MXN" 
    },
    { 
      nombre: "Potion of Eternal Youth",
      ingredientes: "Tequila, licor de durazno y jugo de naranja",
      precio: "$140.00 MXN" 
    }
  ],
  "Queen’s Feast": [
    { 
      nombre: "Hamburguesa BBQ",
      ingredientes: "Jugosa hamburguesa con salsa BBQ y queso cheddar",
      precio: "$160.00 MXN" 
    },
    { 
      nombre: "Papas Gajo",
      ingredientes: "Papas gajo crujientes con especias",
      precio: "$95.00 MXN" 
    }
  ]
};

//Función para mostrar el menú según la categoría seleccionada
export default function MenuPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Potions & Elixirs");

  
  return (
    <div className="min-h-screen bg-[#080f24] text-[#FFE3A9] pt-16  ">
        {/* BANNER PRINCIPAL */}
        <div className="relative w-full h-[300px] overflow-hidden">

            {/* Imagen del banner */}
            <div
              className="absolute inset-0 bg-center bg-cover scale-105 blur-xs"
              style={{ backgroundImage:"url('https://raisedbywolveslv.com/wp-content/uploads/2024/06/louis-hansel-yLUvnCFI500-unsplash-960x750.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/20 to-transparent" />

            <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
              <div>
                <h1 className="mb-2 font-['Alice'] font-semibold text-7xl not-italic text-amber-50 drop-shadow-md">
                    Magical Bites & Sips
                </h1>
                <p className="text-2xl text-[#FFE3A9] font-['Cormorant'] font-bold  not-italic drop-shadow-sm">
                 Drink me. Eat me. Lose yourself.
                </p>
              </div>
            </div>
          </div>


      {/* TÍTULO DE MENÚ */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl font-bold font-['Alice'] mt-5 mb-4 tracking-wider">
           MENU 
        </h1>
        <div className="border-t border-[#725CAD]/50 w-1/3 mx-auto"></div>
      </div>

      {/* CATEGORÍAS  */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {Object.keys(menuData).map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaActiva(categoria)}
            className={`px-6 py-2 text-lg transition-all duration-300 font-['Alice'] ${
              categoriaActiva === categoria
                ? "text-[#FFE3A9] border-b-2 border-[#8CCDEB]"
                : "text-[#725CAD] hover:text-[#FFE3A9]"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* PRODUCTOS DEL MENÚ */}
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

      {/* ESTRELLITAS DECORATIVAS */}
      <div className="flex justify-center mt-16">
        <span className="text-2xl text-[#725CAD] animate-pulse">✦ ✦ ✦</span>
      </div>
    </div>
  );
}