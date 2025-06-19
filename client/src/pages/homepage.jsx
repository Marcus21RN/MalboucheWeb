import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* === HERO PRINCIPAL - Imagen con texto de bienvenida === */}
      <div
        className="w-full h-[400px] bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bienvenido a Malbouche Bar
          </h1>
          <p className="text-white text-lg">
            El mejor ambiente, las mejores bebidas.
          </p>
        </div>
      </div>

      {/* === SECCIÓN DE BEBIDAS DESTACADAS === */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Bebidas destacadas</h2>

        {/* Contenedor de tarjetas de bebidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Mojito", "Piña Colada", "Whiskey Sour"].map((bebida, i) => (
            <div
              key={i}
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition duration-300 transform hover:scale-105"
            >
              {/* Imagen de bebida */}
              <img
                src={`https://source.unsplash.com/400x300/?${bebida.replace(" ", "")},drink`}
                alt={bebida}
                className="w-full h-48 object-cover"
              />
              {/* Información de bebida */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{bebida}</h3>
                <p className="text-sm text-gray-600">
                  Una deliciosa mezcla que te hará volver por más.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === SECCIÓN DE ALIMENTOS DESTACADOS === */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-8">Alimentos recomendados</h2>

        {/* Contenedor de tarjetas de alimentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Hamburguesa BBQ", "Tacos al Pastor", "Papas Gajo"].map((comida, i) => (
            <div
              key={i}
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition duration-300 transform hover:scale-105"
            >
              {/* Imagen de comida */}
              <img
                src={`https://source.unsplash.com/400x300/?${comida.replace(" ", "")},food`}
                alt={comida}
                className="w-full h-48 object-cover"
              />
              {/* Información de comida */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{comida}</h3>
                <p className="text-sm text-gray-600">
                  Perfecto para acompañar tu bebida favorita.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === SECCIÓN "SOBRE NOSOTROS" === */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sobre nosotros</h2>

        {/* Contenido sobre la historia y filosofía del bar */}
        <div className="max-w-3xl mx-auto text-center text-gray-700">
          <p className="mb-4">
            En Malbouche nos especializamos en crear experiencias inolvidables. Con música en vivo, promociones cada semana y un ambiente acogedor, somos el lugar ideal para relajarte o celebrar.
          </p>
          <p>
            Nuestro personal capacitado y nuestra variedad de bebidas y alimentos hacen que cada visita sea única.
          </p>
        </div>
      </section>

      {/* === SECCIÓN DE UBICACIÓN / MAPA === */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">Encuéntranos</h2>

        {/* Mapa incrustado desde Google Maps */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl h-64 border-4 border-white rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Ubicación del bar"
              src="https://maps.google.com/maps?q=bar%20mexico&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}