
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import barImage from "../assets/imagenes/bar.jpg";

import bar1 from "../assets/imagenes/bar1.jpg";
import bar2 from "../assets/imagenes/bar2.jpg";
import bar3 from "../assets/imagenes/bar3.jpg";
import bar4 from "../assets/imagenes/bar4.jpg";
import sureloj from "../assets/imagenes/madhatters.jpg";




export default function HomePage() {
  // === Galería de imágenes del bar ===
  const galeria = [
    { id: 1, imagen: bar1 },
    { id: 2, imagen: bar2 },
    { id: 3, imagen: bar3 },
    { id: 4, imagen: bar4 },
  ];

  // === Lista de bebidas destacadas ===

  const bebidas = [
    {
      nombre: "Mad Hatter Mojito",
      imagen: "https://www.saveur.com/uploads/2007/02/SAVEUR_Mojito_1149-Edit-scaled.jpg?auto=webp",
      descripcion: "Ron, crema de coco y jugo de piña"
    },
    {
      nombre: "White Rabbit Shot",
      imagen: "https://i.pinimg.com/736x/e4/b1/63/e4b163cc8e3ff732336db619dc3e3de2.jpg",
      descripcion: "Ron, crema de coco y jugo de piña"
    },
    {
      nombre: "Queen’s Sour Elixir",
      imagen: "https://cdn.diffordsguide.com/cocktail/rVQbYA/square/0/512x512.webp",
      descripcion: "Whiskey, jugo de limón y jarabe simple"
    },

  ];

  // === Lista de alimentos destacados ===
  const alimentos = [
    {
      nombre: "Hamburguesa BBQ",
      imagen: "https://media.scoolinary.app/recipes/images/2024/06/bbq-chedar-burger.jpg",
      descripcion: "Jugosa hamburguesa con salsa BBQ y queso cheddar"
    },
    {
      nombre: "Boneless",
      imagen: "https://editorialtelevisa.brightspotcdn.com/ca/1e/1516a1f140c8bea0c43e1959fbfe/boneless1-transformed.jpg",
      descripcion: "Chicken boneless BBQ"
    },
    {
      nombre: "Papas Gajo",
      imagen: "https://thecookinglab.es/wp-content/uploads/2024/09/Patatas-gajo-en-freidora-de-aire.jpg",
      descripcion: "Papas gajo crujientes con especias"
    },
    
  ];

  // === Lista de promociones actuales ===
  const promociones = [
    {
      id: 1,
      nombre: "Happy Hour",
      descripcion: "Disfruta de 2x1 en todas las bebidas de 6 a 8 PM",
      imagen: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/happy-hour-template%2C-cocktails-design-561dfde55f3345e809292117fc9c0c3d_screen.jpg?ts=1674381558",
    },
    {
      id: 2,
      nombre: "Noche de Chicas",
      descripcion: "Disfruta de un 20% de descuento en tu cuenta total",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 3,
      nombre: "Noche de Chicos",
      descripcion: "Disfruta de un 20% de descuento en tu cuenta total",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
    {
      id: 4,
      nombre: "Martes de Trivia",
      descripcion: "Participa en nuestra trivia y gana premios especiales",
      imagen: "https://heraldodemexico.com.mx/u/fotografias/m/2020/11/26/f1280x720-287408_419083_5050.jpg",
    },
  ];

  const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-none`}
      style={{ ...style, left: '-25px', color: '#FFE3A9' }}
      onClick={onClick}
    >
      <svg className="w-8 h-8 text-[#FFE3A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-none`}
      style={{ ...style, right: '-25px', color: '#FFE3A9' }}
      onClick={onClick}
    >
      <svg className="w-8 h-8 text-[#FFE3A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

  return (
    <div className="bg-[#080f24] pt-15">
     
      <div className="min-h-screen bg-[#080f24] ">

        {/* === BANNER PRINCIPAL === */}
        <div className="relative w-full h-[500px] overflow-hidden">
          {/* Imagen de fondo desenfocada */}
          <div
            className="absolute inset-0 bg-center bg-cover scale-105 blur-xs"
            style={{ backgroundImage: `url(${barImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f24] via-[#080f24]/20 to-transparent" />

          <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
            <div>
              <h1 className="mb-2 font-['Alice'] font-semibold text-7xl not-italic text-amber-50 drop-shadow-md">
                MALBOUCHE BAR
              </h1>
              <p className="text-2xl text-[#FFE3A9] font-['Cormorant'] font-normal  not-italic drop-shadow-sm">
                A crazy experience inspired by Alice in Wonderland
              </p>
            </div>
          </div>
        </div>

       
        {/* === SECCIÓN SOBRE NOSOTROS === */}
        <section className="px-6 mt-10 py-12 bg-[#080f24]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          
            {/* Imagen */}
            <div className="overflow-hidden rounded-md ">
              <img
                src={sureloj}
                alt="Reloj surrealista"
                className="w-full h-[400px] md:h-[500px] object-cover object-center"
              />
            </div>

            {/* Texto */}
            <div className="text-[#FFE3A9] font-['Cormorant']">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left font-['Alice'] text-amber-50">
                WELCOME TO MALBOUCHE BAR
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-center md:text-left">
                Somewhere in time, where clocks run backwards, tea never gets cold and sanity is optional, lies the Malbouche Bar.
                Drawing inspiration from the fantastical world of <em>Alice in Wonderland</em>, our bar offers more than just drinks; it provides a sensory experience where reality is distorted, cocktails tell stories, and the décor comes to life.
                Here, every drink is a potion, every corner is a rabbit hole and every night is a new chapter of enchanting madness.
                Do you dare follow the White Rabbit?
              </p>
            </div>
          </div>
        </section>

        {/* === GALERÍA DE IMÁGENES === */}
        <section className="w-full  bg-[#080f24]">
          <div className="w-full">
            <Slider
              dots={true}
              infinite={true}
              speed={1000}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
              arrows={false}
              // Estilo para los puntos (dots)
              appendDots={dots => (
                <div className="absolute bottom-0 w-full">
                  <ul className="flex justify-center" style={{ margin: "0", padding: "30px 0 " }}>{dots}</ul>
                </div>
              )}
              customPaging={() => (
                <div className="w-3 h-3 mx-1 rounded-full bg-[#8CCDEB]/60 hover:bg-[#725CAD] transition-colors"></div>
              )}
            >
              {galeria.map((foto) => (
                <div key={foto.id} className="w-full">
                  <div className="w-full h-[400px] md:h-[600px] overflow-hidden">
                    <img
                      src={foto.imagen}
                      alt={`Imagen ${foto.id}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
        
        {/* === SECCIÓN DE BEBIDAS DESTACADAS === */}
        <section className="py-16 px-6 bg-[#080f24] text-[#FFE3A9] font-['Alice'] text-2xl">
          <h2 className="text-4xl text-center font-bold mb-4 drop-shadow-md">
            Potions & Elixirs
          </h2>
          <p className="text-center text-amber-50 mb-8 font-['Cormorant']">
            Drink me, and let the madness begin...
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-8xl mx-auto">
            {bebidas.map((bebida) => (
              <div key={bebida.id} className=" bg-[#0f122e] rounded-sm w-full overflow-hidden shadow-md hover:shadow-[0_0_20px_#725CAD80] transform hover:scale-105 transition duration-500">
                <img
                  src={bebida.imagen}
                  alt={bebida.nombre}
                  className="w-full h-130 object-cover filter: brightness(0.9) contrast(1.1) saturate(1.2)"
                />
                <div className="p-4 text-[#FFE3A9] text-center">
                  <h3 className="text-lg font-bold mb-1">{bebida.nombre}</h3>
                  <p className="text-sm text-amber-50 font-['Cormorant']">{bebida.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === SEPARADOR DECORATIVO === */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-t border-[#725CAD]/70 w-3/12"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#080f24] px-4 font-['Alice'] text-[#FFE3A9]">
              ✧
            </span>
          </div>
        </div>

      {/* === SECCIÓN DE ALIMENTOS DESTACADOS === */}
        <section className="py-5 px-6 bg-[#080f24] text-[#FFE3A9] font-['Alice'] text-2xl">
          <h2 className="text-4xl text-center font-bold mb-4 drop-shadow-md">
            Magical Bites
          </h2>
          <p className="text-center text-amber-50 mb-8 font-['Cormorant']">
           One bite, and you may never be the same size again... 
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-8xl mx-auto">
            {alimentos.map((alimentos) => (
              <div key={alimentos.id} className=" bg-[#0f122e] rounded-sm overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500">
                <img
                  src={alimentos.imagen}
                  alt={alimentos.nombre}
                  className="w-full h-130 object-cover "
                />
                <div className="p-4 text-[#FFE3A9] text-center">
                  <h3 className="text-lg font-bold mb-1">{alimentos.nombre}</h3>
                  <p className="text-sm text-amber-50 font-['Cormorant']">{alimentos.descripcion}</p>
                </div>
                
              </div>
            ))}
          </div>
        </section>

          {/* === SEPARADOR DECORATIVO === */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-t border-[#725CAD]/70 w-3/12"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#080f24] px-4 font-['Alice'] text-[#FFE3A9]">
                ✧
              </span>
            </div>
          </div>

          {/* === SECCIÓN DE PROMOCIONES === */}
          <section className="py-8 px-6 bg-[#080f24] text-[#FFE3A9] font-['Alice'] text-2xl">
            <h2 className="text-4xl text-center font-bold mb-4 drop-shadow-md">
              Mad Specials
            </h2>
            <p className="text-center text-amber-50 mb-8 font-['Cormorant']">
            One bite, and you may never be the same size again... 
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {promociones.map((promociones) => (
                <div key={promociones.id} className=" bg-[#0f122e] rounded-sm overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500">
                  <img
                    src={promociones.imagen}
                    alt={promociones.nombre}
                    className="w-full h-130 object-cover "
                  />
                  <div className="p-4 text-[#FFE3A9] text-center">
                    <h3 className="text-lg font-bold mb-1">{promociones.nombre}</h3>
                    <p className="text-sm text-amber-50 font-['Cormorant']">{promociones.descripcion}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          </section>


      
    </div>
  </div>
  
  );
}
