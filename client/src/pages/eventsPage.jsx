import React, { useEffect, useState } from "react";

export default function EventsPage() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/events"); // Ajusta la URL si es necesario
        const data = await res.json();
        setEventos(data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    obtenerEventos();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdf7f0] text-gray-900 font-sans">
      <section
        className="relative w-full h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')",
        }}
      >
        <h1 className="relative text-4xl md:text-5xl font-bold text-white z-10 text-center px-4">
          Upcoming Events & Promos
        </h1>
      </section>

      <section className="px-6 md:px-16 py-12">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-6 px-8 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Explore our magical nights</h2>
            <p className="text-gray-600 text-sm">A place where fantasy meets entertainment</p>
          </div>

          <div className="max-h-[400px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            {eventos.map((evento) => (
              <div
                key={evento._id}
                className="flex items-start md:items-center justify-between bg-white hover:bg-purple-50 rounded-xl p-4 shadow-sm transition duration-300 border border-gray-100"
              >
                <div className="flex items-start md:items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-purple-200 bg-gray-200 flex items-center justify-center text-purple-700 text-sm font-medium">
                    📅
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-1">{evento.nombre}</h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      {evento.descripcion}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setEventoSeleccionado(evento)}
                  className="hidden md:inline-flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Details <span className="text-xs">&gt;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de detalles */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setEventoSeleccionado(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">{eventoSeleccionado.nombre}</h2>
            <p className="text-gray-700 mb-1"><strong>Descripción:</strong> {eventoSeleccionado.descripcion}</p>
            <p className="text-gray-700 mb-1"><strong>Fecha:</strong> {new Date(eventoSeleccionado.fecha).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-1"><strong>Hora:</strong> {eventoSeleccionado.horaInicio} - {eventoSeleccionado.horaFinal}</p>
            <p className="text-gray-700"><strong>Estado:</strong> {eventoSeleccionado.estado}</p>
          </div>
        </div>
      )}
    </div>
  );
}
