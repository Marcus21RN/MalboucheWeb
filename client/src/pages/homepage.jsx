import React from "react";

export default function HomePage() {

  const promociones = [
    {
      id: 1,
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 2,
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 3,
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
  ];

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

      <section className= "py-12 px-6 bg-gay-100">
        {/* Promociones con efecto hover */}
      <div className="px-6 pb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Current Promotions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {promociones.map((promo) => (
            <div
              key={promo.id}
              className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Imagen con zoom al pasar el mouse */}
              <img
                src={promo.imagen}
                alt={`Promoción ${promo.id}`}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
}