import React from "react";

export default function EventsPage() {
  const eventos = [
    {
      id: 1,
      titulo: "Noche de Jazz",
      descripcion: "Disfruta de música en vivo con bandas locales de jazz.",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 2,
      titulo: "Trivia Night",
      descripcion: "Demuestra tus conocimientos y gana premios.",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 3,
      titulo: "Fiesta de los 80s",
      descripcion: "Ven disfrazado y revive los mejores éxitos de los 80s.",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 4,
      titulo: "Fiesta Pagana",
      descripcion: "Ven y disfruta con nosotros la maravilla de fiesta pagana con Mago de Öz",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 5,
      titulo: "Fiesta Pagana",
      descripcion: "Ven y disfruta con nosotros la maravilla de fiesta pagana con Mago de Öz",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 6,
      titulo: "Fiesta Pagana",
      descripcion: "Ven y disfruta con nosotros la maravilla de fiesta pagana con Mago de Öz",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 7,
      titulo: "Fiesta Pagana",
      descripcion: "Ven y disfruta con nosotros la maravilla de fiesta pagana con Mago de Öz",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 8,
      titulo: "Fiesta Pagana",
      descripcion: "Ven y disfruta con nosotros la maravilla de fiesta pagana con Mago de Öz",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
  ];



  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Banner superior con imagen de fondo */}
      <div
        className="w-full h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://cinepremiere.com.mx/assets/images/entrevistas/2010/02-febrero/TEASERalicia.jpg')",
        }}
      >
        <h1 className="text-4xl font-bold text-white bg-black bg-opacity-50 px-6 py-2 rounded">
          Upcoming Events & Promos
        </h1>
      </div>

      {/* Lista scrollable de eventos */}
      <div className="px-6 py-10">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-md max-h-[400px] overflow-y-auto p-6">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="flex items-center justify-between border-b py-4 hover:bg-gray-100 transition duration-200 rounded-lg px-2"
            >
              <div className="flex items-center gap-4">
                {/* Imagen con efecto hover/zoom */}
                <div className="w-20 h-20 overflow-hidden rounded-md">
                  <img
                    src={evento.imagen}
                    alt={evento.titulo}
                    className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Texto descriptivo */}
                <div>
                  <h3 className="text-lg font-bold">{evento.titulo}</h3>
                  <p className="text-sm text-gray-700">{evento.descripcion}</p>
                </div>
              </div>

              {/* Botón de detalles con animación */}
              <button className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition">
                Details &gt;
              </button>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
