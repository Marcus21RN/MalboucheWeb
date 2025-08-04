import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaFilter, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function EventsPage() {
  const [eventos, setEventos] = useState([]);
  const [eventosOriginales, setEventosOriginales] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoExpandido, setEventoExpandido] = useState(null);
  const [ordenFecha, setOrdenFecha] = useState('desc');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const containerRef = useRef(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/clientBackend/events");
        const data = res.data;
        const activos = data.filter(ev => ev.estado === 'activo');
        setEventosOriginales(activos);
        ordenarEventos(activos, ordenFecha);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    obtenerEventos();
  }, [ordenFecha]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setMostrarFiltros(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ordenarEventos = (eventos, orden) => {
    const eventosOrdenados = [...eventos].sort((a, b) => {
      const fechaA = new Date(a.fechaEvento).getTime();
      const fechaB = new Date(b.fechaEvento).getTime();
      return orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
    });
    setEventos(eventosOrdenados);
  };

  const handleCambioOrden = (nuevoOrden) => {
    setOrdenFecha(nuevoOrden);
    ordenarEventos(eventosOriginales, nuevoOrden);
    setMostrarFiltros(false);
  };

  //Filtrado
  const eventosFiltrados = eventos
    .filter(ev => {
      if (selectedCategory !== 'Todos' && (ev.categoria || "Sin categoría") !== selectedCategory) return false;
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        ev.nombre.toLowerCase().includes(lowerSearch) ||
        (ev.descripcion && ev.descripcion.toLowerCase().includes(lowerSearch)) ||
        (ev.categoria && ev.categoria.toLowerCase().includes(lowerSearch))
      );
    });

    const formatDate = (dateString) => {
      if (!dateString) return { day: '--', month: '---', year: '----' };
      const date = new Date(dateString);
      
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = date.getFullYear();
      return { day, month, year };
    };

  const handleNavigation = (to) => {
    window.location.href = to;
  };

  return (
    <div className="min-h-screen bg-[#000000] text-gray-500 font-['oswald']">
      {/* === BANNER PRINCIPAL === */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <Parallax speed={-40}>
          <img
            src={'https://images.unsplash.com/photo-1565309438213-c2856c92bb52?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt="Bar Banner"
            className="w-full h-full object-cover scale-150"
          />
        </Parallax>
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-start pl-40 h-full px-4">
          <div className="mb-8">
            <div className="w-16 h-1 bg-white mb-5"></div>
            <h1 className="font-['oswald'] font-semibold text-6xl text-white drop-shadow-md">
              <span className="block text-lg font-semibold font-[montserrat] text-[#660152]">MALBOUCHE</span>
              UPCOMING EVENTS
              <span className=" text-[#660152]">.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
{/* Filtros y búsqueda */}
<section
  ref={containerRef}
  className="text-white font-['oswald'] py-8 px-6"
>
  <div className="flex flex-col items-end w-full space-y-4">
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full sm:w-auto">
      {/* Filtro de orden por fecha */}
      <AnimatePresence>
        {mostrarFiltros && (
          <motion.select
            key="order-dropdown"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: window.innerWidth < 640 ? '100%' : 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            value={ordenFecha}
            onChange={e => setOrdenFecha(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded border border-gray-400 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#b76ba3] shadow"
          >
            <option value="desc">Most recent first</option>
            <option value="asc">Oldest first</option>
          </motion.select>
        )}
      </AnimatePresence>

      {/* Input búsqueda */}
      <motion.div
        animate={{
          x: mostrarFiltros && window.innerWidth >= 640 ? -220 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 w-full sm:w-auto sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2 z-10"
      >
        <AnimatePresence>
          {showSearch && (
            <motion.input
              key="search-input"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: window.innerWidth < 640 ? '100%' : 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 rounded border border-gray-400 bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#b76ba3] shadow"
            />
          )}
        </AnimatePresence>
        <button
          onClick={() => {
            setShowSearch(!showSearch);
            if (!showSearch) setMostrarFiltros(false);
          }}
          className="text-[#b76ba3] hover:text-white transition z-20"
        >
          <FaSearch size={25} />
        </button>
      </motion.div>
      <button
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
        className="text-[#b76ba3] hover:text-white transition z-20"
      >
        <FaFilter size={25} />
      </button>
    </div>
  </div>
</section>

      {/* LISTA DE EVENTOS */}
      <div className="px-4 py-10 max-w-7xl mx-auto space-y-6">
        {eventosFiltrados.map((evento) => {
          const { day, month, year } = formatDate(evento.fechaEvento);
          return (
            <div
              key={evento._id}
              className="border-b border-[#333] overflow-hidden group hover:shadow-[0_0_20px_#660152] transition duration-300"
              onClick={() =>
                setEventoExpandido(
                  eventoExpandido && eventoExpandido._id === evento._id
                    ? null
                    : evento
                )
              }
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
                {/* Fecha en estilo Offbeat */}
                <div className="flex items-center gap-6 min-w-[200px]">
                  <div className="text-center border-r border-[#b76ba3] pr-6">
                    <div className="text-5xl font-bold text-[#b76ba3] leading-none">{day}</div>
                    <div className="text-sm uppercase tracking-widest text-white mt-1">{month}</div>
                    <div className="text-xs text-gray-400 mt-1">{year}</div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl md:text-3xl font-bold text-white uppercase group-hover:text-[#b76ba3] transition">
                      {evento.nombre}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[#b76ba3]">{evento.horaInicio}</span>
                      {evento.horaFinal && (
                        <>
                          <span className="text-xs text-gray-500">-</span>
                          <span className="text-sm text-[#b76ba3]">{evento.horaFinal}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* Botones */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEventoSeleccionado(evento);
                    }}
                    className="px-6 py-3 bg-[#b76ba3] tracking-widest font-['oswald'] font-bold text-sm text-white hover:bg-white hover:text-[#660152] transition whitespace-nowrap cursor-pointer"
                  >
                    MORE DETAILS
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DE DETALLES */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-90 bg-rgba(0, 0, 0, 1) transition-all duration-300" style={{ backdropFilter: "blur(2px)" }}>
          <div className="relative bg-gradient-to-br from-[#27011f] via-[#2b0123] to-[#49023a] text-white font-['montserrat'] p-8 rounded-lg max-w-2xl w-full shadow-2xl border-2 border-[#b76ba3] animate-fadeIn">
            <button
              onClick={() => setEventoSeleccionado(null)}
              className="absolute top-6 right-6 text-2xl text-[#b76ba3] hover:text-white transition"
            >
              <IoCloseSharp className="text-[#b76ba3] hover:text-white transition cursor-pointer"/>
            </button>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 mt-2">
                <div className="bg-[#fff] text-black p-4 text-center rounded">
                  <div className="text-5xl font-bold">{formatDate(eventoSeleccionado.fechaEvento).day}</div>
                  <div className="text-xl uppercase tracking-widest">
                    {formatDate(eventoSeleccionado.fechaEvento).month}
                  </div>
                  <div className="text-sm mt-2">
                    {eventoSeleccionado.horaInicio} - {eventoSeleccionado.horaFinal}
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-md font-['montserrat'] text-gray-300 text-justify">
                    {eventoSeleccionado.descripcion}
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold font-['oswald'] mb-4 text-[#fff] text-center uppercase">
                  {eventoSeleccionado.nombre}
                </h2>
                <img
                  src={eventoSeleccionado.imagen || 'https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg'}
                  alt={eventoSeleccionado.nombre}
                  className="w-full max-h-[400px] object-contain rounded-md mb-4"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full bg-gradient-to-b from-[#1e00188a] to-[#3e0132] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Texto */}
            <div className="text-center md:text-left max-w-2xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['oswald'] text-white uppercase tracking-wider leading-tight">
                DON'T MISS OUT THE FUN. <span className="text-[#b76ba3] block md:inline">BOOK NOW.</span>
              </h1>
            </div>
            {/* Botón */}
            <button 
              onClick={() => handleNavigation("/reservations")}
              className="px-12 py-4 cursor-pointer text-white font-['oswald'] border-1 border-[#fff] font-bold transition-colors duration-300 transform hover:scale-105 hover:bg-[#ffff] hover:text-[#35002a] shadow-lg"
            >
              BOOK YOUR TABLE
            </button>
          </div>
        </div>
      </div>
      {/* BOTÓN DE VOLVER AL PRINCIPIO */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-[#660152c9]  text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-[#b76ba3] transition"
      >
        <IoIosArrowUp size={24} />
      </button>
    </div>
  );
}