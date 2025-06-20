import React from "react";

export default function HomePage() {
  // === Galería de imágenes del bar ===
  const galeria = [
    { id: 1, imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg" },
    { id: 2, imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg" },
    { id: 3, imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg" },
  ];

  // === Lista de bebidas destacadas ===
  const bebidas = [
    {
      nombre: "Mojito",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      nombre: "Piña Colada",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      nombre: "Whiskey Sour",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
  ];

  // === Lista de alimentos destacados ===
  const alimentos = [
    {
      nombre: "Hamburguesa BBQ",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      nombre: "Tacos al Pastor",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      nombre: "Papas Gajo",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
  ];

  // === Lista de promociones actuales ===
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
      {/* === BANNER PRINCIPAL === */}
      <div
        className="w-full h-[400px] bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg')",
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

      {/* === SECCIÓN SOBRE NOSOTROS === */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Sobre nosotros</h2>
        <div className="max-w-4xl mx-auto text-center text-gray-700">
          <p className="mb-4 text-center-justify">
            En Malbouche Bar, te sumergimos en un mundo inspirado en Alicia en el País de las Maravillas. Música en vivo, bebidas únicas y un ambiente mágico te esperan.
          </p>
          <p className="mb-4 text-center-justify">
            Visítanos y descubre por qué somos el lugar favorito para escapar de lo ordinario.
          </p>
        </div>
      </section>

      {/* === GALERÍA DE IMÁGENES === */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-8">Galería</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galeria.map((foto) => (
            <div
              key={foto.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <img
                src={foto.imagen}
                alt={`Imagen ${foto.id}`}
                className="w-full h-60 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* === SECCIÓN DE BEBIDAS DESTACADAS === */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Bebidas destacadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {bebidas.map((bebida, i) => (
            <div
              key={i}
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition transform hover:scale-105"
            >
              <img
                src={bebida.imagen}
                alt={bebida.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{bebida.nombre}</h3>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {alimentos.map((comida, i) => (
            <div
              key={i}
              className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition transform hover:scale-105"
            >
              <img
                src={comida.imagen}
                alt={comida.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{comida.nombre}</h3>
                <p className="text-sm text-gray-600">
                  Perfecto para acompañar tu bebida favorita.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === SECCIÓN DE PROMOCIONES === */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Promociones actuales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {promociones.map((promo) => (
            <div
              key={promo.id}
              className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <img
                src={promo.imagen}
                alt={`Promoción ${promo.id}`}
                className="w-full h-full object-cover transform hover:scale-110 transition"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
