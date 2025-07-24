import React, { useEffect, useState } from "react";

import { IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function EventsPage() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventoExpandido, setEventoExpandido] = useState(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const res = await fetch("http://localhost:3000/clientBackend/events");
        const data = await res.json();
        setEventos(data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    obtenerEventos();
  }, []);

  return (
    <div className="min-h-screen bg-[#080f24] text-[#8CCDEB] font-['Alice'] pt-16 ">
      {/* BANNER PRINCIPAL */}
      <div className="relative w-full h-[300px] overflow-hidden ">
        <div
          className="absolute inset-0 bg-center bg-cover scale-105 blur-xs"
          style={{
            backgroundImage:
              "url('https://cloudfront-us-east-1.images.arcpublishing.com/gray/WVYW3J7GLFCXXGOI343BI7XOUE.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/20 to-transparent " />

        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div>
            <h1 className="mb-2 font-semibold text-7xl text-amber-50 drop-shadow-md">
              Twilight Tea Parties
            </h1>
            <p className="text-2xl text-[#FFE3A9] font-['Cormorant'] font-bold drop-shadow-sm">
              A place where time forgets to tick
            </p>
          </div>
        </div>
      </div>

    

      {/* LISTA DE EVENTOS */}
      <div className="px-4 py-10 max-w-5xl mx-auto space-y-6 ">
        {eventos.map((evento) => (
          <div
            key={evento._id}
            className=" border-b overflow-hidden cursor-pointer group hover:shadow-[0_0_20px_#725CAD80] transform hover:scale-105 transition duration-500"
            onClick={() =>
              setEventoExpandido(
                eventoExpandido && eventoExpandido._id === evento._id
                  ? null
                  : evento
              )
            }
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 min-w-[100px] min-h-[100px] flex items-center justify-center text-3xl">
                  <img
                    src={evento.imagen || 'https://lkb-blog-images.linkaband.com/animation-bar/bar-concert-paris/13491-thumbnail-resized-BLOG_PAGE_THUMBNAIL.jpg'}
                    alt={evento.nombre}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-bold text-[#FFE3A9] flex items-center gap-2">
                    {evento.nombre}
                      <IoIosArrowForward
                        className="text-[#8CCDEB] text-2xl transform transition-transform duration-300"
                        style={{ transform: eventoExpandido && eventoExpandido._id === evento._id ? 'rotate(90deg)' : 'rotate(0deg)' }}

                      />
                  </p>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      eventoExpandido && eventoExpandido._id === evento._id ? 'max-h-[120px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-md font-['Cormorant'] text-amber-50/80 mt-1 overflow-y-auto w-xl">
                      {evento.descripcion}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEventoSeleccionado(evento);
                }}
                className="px-8 py-2 bg-[#725CAD] font-['Cormorant'] font-bold text-md text-amber-50 rounded-md hover:bg-[#5e47a3] transition"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm ">
          <div className="bg-[#725CAD] p-6 rounded-md w-full max-w-xl text-[#080f24] font-['Cormorant'] relative">
            <button
              onClick={() => setEventoSeleccionado(null)}
              className="absolute top-4 right-3 text-2xl text-[#080f24] hover:text-[#080f24]/50"
            >
              <IoCloseSharp />
              
            </button>
            <h2 className="text-3xl font-['Alice'] font-bold mb-3 text-[#080f24] text-center">
              {eventoSeleccionado.nombre}
            </h2>
            <img
              src={eventoSeleccionado.imagen || 'https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg'}
              alt={eventoSeleccionado.nombre}
              className="w-full max-h-100 object-cover rounded-md mb-4"
            />
            <p className="mb-2 text-lg text-[#080f24] font-bold font-['Cormorant']">
              <strong className="text-xl text-amber-50 font-['Alice']">Descripción:</strong> {eventoSeleccionado.descripcion}
            </p>
            <p className="mb-2 text-lg font-bold text-[#080f24] font-['Cormorant']">
              <strong className="text-xl text-amber-50 font-['Alice']">Fecha:</strong>{" "}
              {new Date(eventoSeleccionado.fecha).toLocaleDateString()}
            </p>
            <p className="mb-2 text-lg font-bold text-[#080f24] font-['Cormorant']">
              <strong className="text-xl text-amber-50 font-['Alice']">Hora:</strong> {eventoSeleccionado.horaInicio} – {eventoSeleccionado.horaFinal}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
