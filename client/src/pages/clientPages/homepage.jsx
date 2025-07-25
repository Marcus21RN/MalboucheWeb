
import Slider from "react-slick";
import { Link } from 'react-router-dom'; // Importa Link
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Parallax } from 'react-scroll-parallax';
import React, { useEffect, useState } from 'react';
import axios from "axios";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { IoCloseSharp } from "react-icons/io5";


import barImage from "../../assets/imagenes/bar.jpg";
import neon2 from "../../assets/imagenes/neon2.jpg";
import banner2 from "../../assets/imagenes/banner2.jpg";

import bar1 from "../../assets/imagenes/bar6.jpg";
import bar2 from "../../assets/imagenes/bar2.jpg";
import bar3 from "../../assets/imagenes/bar3.jpg";
import bar4 from "../../assets/imagenes/bar4.jpg";
import sureloj from "../../assets/imagenes/aboutUs.jpg";


export default function HomePage() {
  // === Galería de imágenes del bar ===
  const imagenes = [
    { id: 1, imagen: bar1 },
    { id: 2, imagen: bar3 },
    { id: 3, imagen: bar2 },
    { id: 4, imagen: bar4 },
  ];

  // === Lista de bebidas destacadas ===

  const [menuData, setMenuData] = useState([]);



useEffect(() => {
  axios.get("http://localhost:3000/clientBackend/destacados-home")
    .then(res => setMenuData(res.data))
    .catch(() => setMenuData([]));
}, []);




  // === Lista de promociones actuales ===
const [promociones, setPromociones] = useState([]);

useEffect(() => {
  axios.get("http://localhost:3000/clientBackend/promociones-activas")
    .then(res => setPromociones(res.data))
    .catch(() => setPromociones([]));
}, []);
    
    const [modalAbierto, setModalAbierto] = useState(false);
    const [promocionSeleccionada, setPromocionSeleccionada] = useState(null);

    const abrirModal = (promocion) => {
      setPromocionSeleccionada(promocion);
      setModalAbierto(true);
    };

  const cerrarModal = () => {
    setModalAbierto(false);
    setPromocionSeleccionada(null);
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} before:content-none`}
        style={{ ...style, right: '-25px', color: '#FFE3A9' }}
        onClick={onClick}
      >
        <svg className="w-8 h-8 text-[#FFE3A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };

 // Función para manejar navegación con recarga
  const handleNavigation = (to) => {
      window.location.href = to;
  };


  return (
    <div className="bg-[#000000]">
      <div className="min-h-screen bg-[#000000] ">

      {/* === BANNER PRINCIPAL === */}
        <div className="relative w-full h-[570px] overflow-hidden">
          {/* Imagen Parallax */}
          <Parallax speed={-20}>
            <img
              src={barImage}
              alt="Bar Banner"
              className="w-full h-full object-cover scale-150"
            />
          </Parallax>

          {/* Contenido encima del fondo */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start pl-40 h-full px-4">
            <div className="mb-8">
              <div className="w-16 h-1 bg-white mb-5"></div>
              <h1 className="font-['oswald'] font-semibold text-6xl text-white drop-shadow-md">
                <span className="block">UNFORGETTABLE NIGHTS</span>
                <span className="block mt-4">AT MALBOUCHE BAR</span>
              </h1>
            </div>
            <button
              onClick={() => handleNavigation("/reservations")}
              className="px-8 py-3 text-white font-['montserrat'] border-1 hover:border-[#b76ba3] transition-colors duration-300 transform hover:scale-105"
            >
              BOOK NOW
            </button>
          </div>
        </div>
       
        {/* === SECCIÓN SOBRE NOSOTROS === */}
        <section className="px-6 mt-10 py-12 bg-[#000000]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          
            {/* Imagen */}
            <div className="overflow-hidden rounded-md ">
              <img
                src={sureloj} 
                alt="Reloj surrealista"
                className="w-full h-[400px] md:h-[500px] object-cover object-center"
              />
            </div>

            {/* Texto */}
            <div className="text-[#fbf7f4] font-['montserrat']">
              <span className=" font-normal text-[#b76ba3]">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-center md:text-left font-['oswald'] text-[#fbf7f4]">
                WELCOME TO MALBOUCHE BAR
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-center md:text-left">
                Somewhere in time, where clocks run backwards, tea never gets cold and sanity is optional, lies the Malbouche Bar.
                Drawing inspiration from the fantastical world of <em>Alice in Wonderland</em>, our bar offers more than just drinks; it provides a sensory experience where reality is distorted, cocktails tell stories, and the décor comes to life.
                Here, every drink is a potion, every corner is a rabbit hole and every night is a new chapter of enchanting madness.
                Do you dare follow the White Rabbit?
              </p>
            </div>
          </div>
        </section>

        {/* === GALERÍA DE IMÁGENES === */}
      <section className="bg-[#000000] py-16 px-4">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {imagenes.map((item, index) => (
              <div
                key={index}
                className={`
                  overflow-hidden rounded-md
                  ${index === 0 ? 'md:col-span-2 md:row-span-1' : ''}
                  ${index === 1 ? 'md:col-span-1 md:row-span-2' : ''}
                  ${index === 2 ? 'md:col-span-1 md:row-span-1' : ''}
                  ${index === 3 ? 'md:col-span-1 md:row-span-1' : ''}
                `}
              >
                <img
                  src={item.imagen}
                  alt={`Imagen ${index}`}
                  className="w-full h-full object-cover rounded-sm transition duration-500 ease-in-out hover:scale-105 hover:brightness-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* === SECCIÓN DE BOTON DE EVENTOS === */}
        <section className="px-6  py-12 bg-[#000000] mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">

            {/* Imagen */}
            <div className="overflow-hidden rounded-md ">
              <img
                src={neon2} 
                alt="Reloj surrealista"
                className="w-full h-[600px] md:h-[400px] object-cover object-center"
              />
            </div>

            {/* Texto */}
            <div className="text-[#fbf7f4] font-['montserrat']">
              <span className=" font-normal text-[#b76ba3]">New experiences</span>
                <h2 className="text-3xl md:text-6xl font-bold mt-2 mb-6 text-center md:text-left font-['oswald'] text-[#fbf7f4]">
                  CHECK OUR EVENTS
                  <span className="text-[#b76ba3]">.</span> 
                </h2>
             
              <p className="mb-6 text-lg leading-relaxed text-center md:text-left">
                When searching for the right place to get lost and enjoy new experiences, Malbouche bar is the perfect choice.
                We offer a wide variety of events, from live music to themed parties, where you can enjoy the best atmosphere and meet new people.
                Join us and discover why we are the favorite place for those who seek to escape reality.
              </p>

              <button 
                onClick={() => handleNavigation("/events")}
                className="px-8 py-3  text-white font-['montserrat'] border-1 hover:border-[#b76ba3] font-normal  transition-colors duration-300 transform hover:scale-105"
              >
                GO TO EVENTS
              </button>
            </div>
          </div>
        </section>
        
        {/* === SEGUNDO BANNER === */}
        <div className="relative w-full h-[630px] overflow-hidden">
          {/* Imagen Parallax */}
          <Parallax speed={-20}>
            <img
              src={banner2}
              alt="Bar Banner"
              className="w-full h-full object-cover scale-150"
            />
          </Parallax>

          {/* Contenido encima del fondo */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center  h-full px-4">
            <div className="mb-8">
            
                <h1 className="font-['oswald'] font-semibold text-5xl text-white drop-shadow-md">
                  <span className="block mt-4">"</span>
                  <span className="block">I HAD AN AMAZING TIME AT THIS BAR! THE ATMOSPHERE WAS GREAT,</span>
                  <span className="block mt-4">THE DRINKS WERE TOP-NOTCH, AND THE FOOD WAS DELICIOUS.</span>  
                  
                </h1>
                <h2 className="text-2xl text-white font-['oswald'] mt-4">- A Happy Customer</h2>

            </div>
            
          </div>
        </div>

      {/* === SECCIÓN DE MENUS === */}
        <section className="py-16 px-6 bg-[#000000] text-white font-['montserrat'] min-h-screen">
          <h2 className="text-xl text-center font-light mb-4 text-[#b76ba3]">
            OUR MENU
          </h2>
          <p className="text-center text-white mb-12 font-['oswald'] font-bold text-5xl md:text-6xl">
            GREAT FOOD. AMAZING DRINKS.
          </p>

          {menuData.length === 0 ? (
            <p className="text-center text-white">Cargando menú...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {menuData.map((cat, index) => (
                <div key={index} className="bg-[#000000] text-white shadow-lg border border-[#b76ba3] rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img src={cat.imagen} alt={cat.categoria} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold uppercase text-[#b34789] mb-4">{cat.categoria}</h3>
                    {cat.items.map((item, i) => (
                      <div key={i} className="mb-6 border-b-2  border-[#660152] pb-4">
                        <p className="font-semibold text-lg">
                          {item.nombre} <span className="text-[#b34789]">${item.precio.toFixed(2)}</span>
                        </p>
                        <p className="text-sm text-white 700">{item.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              </div>
            )}
            <div className="text-center mt-12">
                <button 
                  onClick={() => handleNavigation("/menu")}
                  className="px-10 py-5  text-white font-['montserrat'] border-1 hover:border-[#b76ba3] font-normal  transition-colors duration-300 transform hover:scale-105"
                >
                  SEE FULL MENU
              </button>
            </div>
        
          </section>
          {/* === SECCIÓN DE PROMOCIONES === */}
          <section className="py-8 px-6 bg-gradient-to-b from-[#1e00188a] to-[#3e0132] text-white font-['oswald'] h-[450px]">
            <h2 className="text-5xl text-center font-bold mb-10 drop-shadow-md">
              DON'T MISS OUR PROMOS
            </h2>

            <div className="flex overflow-x-auto gap-6 scrollbar-hide items-start pl-4 pr-4 justify-center ">
              {promociones.map((promo) => (
                <div
                  key={promo._id}
                  className="min-w-[300px] text-center py-8 px-4 transition-transform transform  flex-shrink-0"
                >
                  <h3 className="text-4xl font-['oswald'] font-bold text-white hover:text-[#b76ba3] mb-4 uppercase">
                    {promo.nombre}
                  </h3>
                  <div className="justify-center items-center flex mb-4">
                    <button
                    onClick={() => abrirModal(promo)}
                    className="text-[#b76ba3] flex items-center justify-centergap-2 px-4 py-2 hover:text-white transition font-bold font-['montserrat']"
                  >
                    LEARN MORE
                    <IoIosArrowForward className="text-xl justify-center" />
                  </button>
                  </div>
                
                </div>
              ))}
            </div>


        {/* Modal */}
        {modalAbierto && promocionSeleccionada && (
          <div className="fixed inset-0 z-50 bg-[rgba(23,26,30,0.8)] flex justify-center items-center">
            <div className="bg-[#35002a] text-white font-['montserrat'] p-6 rounded-md max-w-md w-full relative shadow-2xl">
              <button
                onClick={cerrarModal}
                className="absolute top-1 right-2 text-white text-4xl hover:text-[#f5f5f5]"
              >
                &times;
              </button>
              <img
                src={promocionSeleccionada.imagen}
                alt={promocionSeleccionada.nombre}
                className="w-full h-150 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{promocionSeleccionada.nombre}</h3>
              <p className="text-sm">{promocionSeleccionada.descripcion}</p>
              {promocionSeleccionada.fechaInicio && promocionSeleccionada.fechaFin && (
                <p className="text-sm mt-2">
                  Inicio promoción: {new Date(promocionSeleccionada.fechaInicio).toLocaleDateString()} <br />
                  Fin promoción: {new Date(promocionSeleccionada.fechaFin).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}
      </section>
      {/* BOTÓN DE VOLVER AL PRINCIPIO */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-[#660152c9] text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-[#b76ba3] transition"
      >
        <IoIosArrowUp size={24} />
      </button>
    </div>
  </div>
  
  );
}
