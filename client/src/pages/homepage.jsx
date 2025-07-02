
import barImage from "../assets/imagenes/bar.jpg";
import drinkmeImage from "../assets/imagenes/drinkme.png";
/* import eatImage from "../assets/imagenes/eatme.png  ";
 */import React, { useState } from "react";



export default function HomePage() {
  // === Galería de imágenes del bar ===
  const galeria = [
    { id: 1, imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg" },
    { id: 2, imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg" },
    { id: 3, imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg" },
  ];

  // === Lista de bebidas destacadas ===
  const [showCards, setShowCards] = useState(false);
  const bebidas = [
    {
      nombre: "Mojito",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
      descripcion: "Ron, crema de coco y jugo de piña"
    },
    {
      nombre: "Piña Colada",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
      descripcion: "Ron, crema de coco y jugo de piña"
    },
    {
      nombre: "Whiskey Sour",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
      descripcion: "Whiskey, jugo de limón y jarabe simple"
    },
  
  ];

  // === Lista de alimentos destacados ===
  const [showCardsAli, setShowCardsAli] = useState(false);
  const alimentos = [
    {
      nombre: "Hamburguesa BBQ",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      nombre: "Tacos al Pastor",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      nombre: "Papas Gajo",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
  ];

  // === Lista de promociones actuales ===
  const promociones = [
    {
      id: 1,
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 2,
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 3,
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
  ];

  return (
    <div className="bg-[#080f24] pt-15">
     
      <div className="min-h-screen bg-[#080f24] ">

        {/* === BANNER PRINCIPAL === */}
        <div className="relative w-full h-[400px]">
        {/* Imagen de fondo */}
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${barImage})` }}
          />
  
          {/* Capa de degradado oscuro (personalizable) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/40 to-transparent" />
  
        {/* Contenido superpuesto */}
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div className="px-6 py-4 rounded bg-black/30 backdrop-blur-sm">
            <h1 className="mb-2 font-serif text-4xl font-bold text-white md:text-5xl">
              Malbouche Bar
            </h1>
            <p className="text-lg text-[#FFE3A9]">
              El mejor ambiente, las mejores bebidas
            </p>
          </div>
        </div>
      </div>

      {/* === SECCIÓN SOBRE NOSOTROS === */}
      <section className="px-6 py-12 bg.theme.colors.background">
        <h2 className="mb-6 text-2xl font-bold text-center text-amber-50">Sobre nosotros</h2>
        <div className="max-w-4xl mx-auto text-center text-[#FFE3A9]">
          <p className="mb-4 text-center-justify">
            En Malbouche Bar, te sumergimos en un mundo inspirado en Alicia en el País de las Maravillas. Música en vivo, bebidas únicas y un ambiente mágico te esperan.
          </p>
          <p className="mb-4 text-center-justify">
            Visítanos y descubre por qué somos el lugar favorito para escapar de lo ordinario.
          </p>
        </div>
      </section>

      {/* === GALERÍA DE IMÁGENES === */}
      <section className="px-6 py-12 bg-[#080f24]"> 
        <h2 className="mb-8 text-2xl font-bold text-center">Galería</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {galeria.map((foto) => (
            <div
              key={foto.id}
              className="overflow-hidden transition transform rounded-lg shadow-md hover:shadow-xl hover:scale-105"
            >
              <img
                src={foto.imagen}
                alt={`Imagen ${foto.id}`}
                className="object-cover w-full h-60"
              />
            </div>
          ))}
        </div>
      </section>

     {/* === SECCIÓN DE BEBIDAS DESTACADAS === */}
      <section className="px-6 py-12 pt-4 pb-12">
        {/* <h2 className="font-serif text-2xl font-bold text-center text-cyan-50 ">Bebidas destacadas</h2> */}
        
        <div className="flex flex-col items-stretch gap-8 md:flex-row">
          {/* Contenedor de imagen optimizado */}
          <div 
            className={`relative w-full md:w-1/2 aspect-[4/5] cursor-pointer transition-all ml-50 duration-500 ${showCards ? 'md:mr-[-20%]' : ''}`}
            onClick={() => setShowCards(!showCards)}
          >
            {/* Imagen con object-contain para ver completa */}
            <img
              src={drinkmeImage}
              alt="Nuestras bebidas especiales"
              className="absolute inset-0 object-contain w-full h-full"
            />
            {/* Overlay interactivo */}
          </div>

          {/* Mensaje o Cards */}
          <div className={`w-full ml-50 md:w-1/2 transition-all duration-300 ${showCards ? 'opacity-0 h-0' : 'opacity-100 h-auto flex items-center'}`}>
            <div>
              <h3 className="text-3xl font-serif text-[#FFE3A9] mb-4">¿Quieres ver el mundo desde una nueva perspectiva? Entonces bébeme...</h3>
              
            </div>
          </div>

          {/* Cards que aparecen */}
          <div className={`grid grid-cols-1  mr-20 gap-6 w-full transition-all duration-500 overflow-hidden ${showCards ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {bebidas.map((bebida, i) => (
              <div 
                key={i}
                className="bg-[#080f24] border border-[#FFE3A9]/20 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-[1.02] "
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={bebida.imagen}
                      alt={bebida.nombre}
                      className="object-cover w-full h-full min-h-48"
                    />
                  </div>
                  <div className="p-4 md:w-2/3">
                    <h3 className="text-xl font-serif text-[#FFE3A9]">{bebida.nombre}</h3>
                    <p className="mt-2 text-[#f5f0e1]">{bebida.descripcion}</p>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        
     {/* === SECCIÓN DE ALIMENTOS DESTACADOS === */}       


      {/* === SECCIÓN DE PROMOCIONES === */}
      <section className="px-6 py-12">
        <h2 className="mb-6 text-2xl font-semibold text-center">Promociones actuales</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {promociones.map((promo) => (
            <div
              key={promo.id}
              className="w-full h-40 overflow-hidden transition bg-gray-200 rounded-lg shadow-md hover:shadow-xl"
            >
              <img
                src={promo.imagen}
                alt={`Promoción ${promo.id}`}
                className="object-cover w-full h-full transition transform hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
  
  );
}
