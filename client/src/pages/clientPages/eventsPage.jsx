import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';
import { IoIosArrowUp } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import axios from 'axios';

export default function EventsPage() {
  const [eventos, setEventos] = useState([]);
  const [eventosOriginales, setEventosOriginales] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoExpandido, setEventoExpandido] = useState(null);
  const [ordenFecha, setOrdenFecha] = useState('desc');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/clientBackend/events");
        const data = res.data;
        // Only set active events (defensive, backend already filters)
        const activos = data.filter(ev => ev.estado === 'activo');
        setEventosOriginales(activos);
        ordenarEventos(activos, ordenFecha);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    obtenerEventos();
  }, [ordenFecha]);

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

  const formatDate = (dateString) => {
    if (!dateString) return { day: '--', month: '---', year: '----' };
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const day = adjustedDate.getDate();
    const month = adjustedDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = adjustedDate.getFullYear();
    return { day, month, year };
  };

   // Función para manejar navegación con recarga
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

      {/* CONTROLES DE ORDENACIÓN CON ICONO DE FILTRO */}
      <div className="max-w-5xl mx-auto px-4 py-6 flex justify-end relative">
        <button 
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center gap-2 px-4 py-2 rounded-sm transition mb-5"
        >
          <FaFilter className="text-[#b76ba3] " size={25} />
        </button>
        
        {/* Menú desplegable de filtros */}
        {mostrarFiltros && (
          <div className="absolute top-16 right-4 bg-[#222] border border-[#b76ba3] rounded-sm shadow-lg z-10 min-w-[200px]">
            
            <button
              onClick={() => handleCambioOrden('desc')}
              className={`w-full text-left px-4 py-2 text-sm ${ordenFecha === 'desc' ? 'bg-[#b76ba3] text-white' : 'text-gray-300 hover:bg-[#333]'}`}
            >
             SORT BY NEWEST
            </button>
            <button
              onClick={() => handleCambioOrden('asc')}
              className={`w-full text-left px-4 py-2 text-sm ${ordenFecha === 'asc' ? 'bg-[#b76ba3] text-white' : 'text-gray-300 hover:bg-[#333]'}`}
            >
              SORT BY OLDEST
            </button>
          </div>
        )}
      </div>

      {/* LISTA DE EVENTOS */}
      <div className="px-4 py-10 max-w-7xl mx-auto space-y-6">
        {eventos.map((evento) => {
          const { day, month, year } = formatDate(evento.fechaEvento);
          return (
            <div
              key={evento._id}
              className="border-b border-[#333] overflow-hidden cursor-pointer group hover:shadow-[0_0_20px_#660152] transition duration-300"
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
                    className="px-6 py-3 bg-[#b76ba3] tracking-widest font-['oswald'] font-normal text-sm text-white rounded-sm hover:bg-white hover:text-[#b76ba3] transition whitespace-nowrap"
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
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111418] p-8 rounded-md w-full max-w-2xl text-white relative border border-[#b76ba3]">
            <button
              onClick={() => setEventoSeleccionado(null)}
              className="absolute top-6 right-6 text-2xl text-[#b76ba3] hover:text-white transition"
            >
              <IoCloseSharp />
            </button>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 mt-2">
                <div className="bg-[#b76ba3] text-black p-4 text-center rounded">
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
                <h2 className="text-3xl font-bold font-['oswald'] mb-4 text-[#b76ba3] uppercase">
                  {eventoSeleccionado.nombre}
                </h2>
                
                <img
                  src={eventoSeleccionado.imagen || 'https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg'}
                  alt={eventoSeleccionado.nombre}
                  className="w-full h-70 object-cover rounded-md mb-4"
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
        className="px-12 py-4 border-2 border-[#b76ba3] bg-transparent hover:bg-[#b76ba3] text-white hover:text-white font-semibold font-['oswald'] uppercase tracking-wider rounded-sm transition-all duration-300"
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