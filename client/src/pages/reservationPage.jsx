import React from "react";

export default function ReservationPage() {
  return (
    <div className="bg-[#fff7e8] text-[#1f1f1f] min-h-screen">
      {/* === BANNER SUPERIOR CON IMAGEN === */}
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582450745624-9b47fd1e89aa?auto=format&fit=crop&w=1350&q=80')" }}>
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Reservations</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 grid gap-10">
        {/* === FORMULARIO DE RESERVACIÓN === */}
        <form className="bg-white shadow-lg rounded-lg p-8 space-y-10">

          {/* === SECCIÓN: FILL THE RESERVATION FORM === */}
          <div>
            <h2 className="text-xl text-center font-semibold mb-4">Fill the reservation form</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <input type="number" placeholder="Guests" min="1" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="date" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="time" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
          </div>

          {/* === SECCIÓN: AVAILABILITY === */}
          <div>
            <h2 className="text-xl text-center font-semibold mb-4">Availability</h2>
            {/* Horarios estáticos mostrados como botones seleccionables */}
            <div className="flex flex-wrap gap-3">
              {['18:00', '18:30', '19:00', '19:30', '20:00'].map((time, i) => (
                <button key={i} type="button" className="px-4 py-2 flex-auto bg-yellow-200 hover:bg-yellow-300 rounded-lg shadow">
                  {time}
                </button>
              ))}
            </div>
            {/* Comentario: Para hacer esto dinámico, conecta con la base de datos para obtener los horarios disponibles por fecha seleccionada. Usa useEffect para escuchar cambios en la fecha y consulta el backend. */}
          </div>

          {/* === SECCIÓN: CUSTOMER INFORMATION === */}
          <div>
            <h2 className="text-xl text-center font-semibold mb-4">Customer Information</h2>
            <div className="grid md:grid-cols-4 gap-1">
              <input type="text" placeholder="First name" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="text" placeholder="Last name" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="tel" placeholder="Phone number" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="text" placeholder="Example@example.com" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
          </div>

          {/* === BOTÓN DE ENVÍO === */}
          <div className="text-center">
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-lg shadow">
              Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}