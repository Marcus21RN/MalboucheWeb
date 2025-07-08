import React, { useEffect, useState } from "react";

export default function EventsPage() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        const data = await res.json();
        setEventos(data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
      }
    };
    obtenerEventos();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F4EF] text-[#3d2767] font-sans transition-all duration-500 ease-in-out pt-16">
      {/* Encabezado con imagen */}
      <section
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center shadow-md"
        style={{
          backgroundImage:
            "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')",
        }}
      >
          {/* Capa de degradado oscuro (personalizable) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/40 to-transparent" />
        
        <div className="bg-[#4B2E83]/70 backdrop-blur-sm p-6 rounded-xl shadow-xl text-center">
          <h1 className="text-5xl font-serif font-bold text-[#F2C1E0] drop-shadow-md transition-all">
            Upcoming Events & Promos
          </h1>
        </div>
      </section>

      {/* Contenido principal de eventos */}

        <div>
          <div className="text-center px-6 py-12 bg-[#080f24]">
            <h2 className="text-4xl font-serif font-bold text-[#FFE3A9]">
              ✨ Explore our magical nights
            </h2>
            <p className="text-2xl font-serif text-[#FFE3A9]/100 mt-2">
              Donde la fantasía se encuentra con la diversión
            </p>
          </div>

          {/* Lista de eventos en filas */}
          <div className="p-6 flex flex-col gap-4">
            {eventos.map((evento) => (
              <div
                key={evento._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#F9F4EF] hover:bg-[#F2C1E0]/40 rounded-xl p-4 shadow-md transition duration-300 border border-[#4B2E83]/10"
              >
                <div className="flex items-start md:items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-[#F2C1E0] flex items-center justify-center text-3xl">
                    🕰️
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#4B2E83] mb-1">
                      {evento.nombre}
                    </h3>
                    <p className="text-sm text-[#4B2E83]/80 max-w-md">
                      {evento.descripcion}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setEventoSeleccionado(evento)}
                  className="mt-4 md:mt-0 md:inline-flex items-center gap-1 px-4 py-2 bg-[#4B2E83] text-white rounded-lg hover:bg-[#351f66] transition"
                >
                  Ver más <span className="text-xs">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>


      {/* Modal de detalles */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl relative transition duration-300">
            <button
              onClick={() => setEventoSeleccionado(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-serif font-bold text-[#4B2E83] mb-2">
              {eventoSeleccionado.nombre}
            </h2>
            <p className="text-[#4B2E83]/80 mb-1">
              <strong>Descripción:</strong> {eventoSeleccionado.descripcion}
            </p>
            <p className="text-[#4B2E83]/80 mb-1">
              <strong>Fecha:</strong>{" "}
              {new Date(eventoSeleccionado.fecha).toLocaleDateString()}
            </p>
            <p className="text-[#4B2E83]/80 mb-1">
              <strong>Hora:</strong> {eventoSeleccionado.horaInicio} -{" "}
              {eventoSeleccionado.horaFinal}
            </p>
            <p className="text-[#4B2E83]/80">
              <strong>Estado:</strong> {eventoSeleccionado.estado}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
