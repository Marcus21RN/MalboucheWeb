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
    // Otros eventos omitidos por brevedad...
  ];

  return (
    <div className="min-h-screen bg-[#fdf7f0] text-gray-900 font-sans">
      {/* === BANNER PRINCIPAL === */}
      <section
        className="relative w-full h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')",
        }}
      >
        <div className="absolute inset-0"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-white z-10 text-center px-4">
          Upcoming Events & Promos
        </h1>
      </section>

      {/* === CONTENEDOR PRINCIPAL DE EVENTOS === */}
      <section className="px-6 md:px-16 py-12">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-6 px-8 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Explore our magical nights</h2>
            <p className="text-gray-600 text-sm">A place where fantasy meets entertainment</p>
          </div>

          {/* Lista scrollable con eventos */}
          <div className="max-h-[400px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="flex items-start md:items-center justify-between bg-white hover:bg-purple-50 rounded-xl p-4 shadow-sm transition duration-300 border border-gray-100"
              >
                <div className="flex items-start md:items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-purple-200">
                    <img
                      src={evento.imagen}
                      alt={evento.titulo}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-1">{evento.titulo}</h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      {evento.descripcion}
                    </p>
                  </div>
                </div>

                <button className="hidden md:inline-flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Details <span className="text-xs">&gt;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
