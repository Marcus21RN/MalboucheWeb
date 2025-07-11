
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import barImage from "../../assets/imagenes/bar.jpg";

import bar1 from "../../assets/imagenes/bar1.jpg";
import bar2 from "../../assets/imagenes/bar2.jpg";
import bar3 from "../../assets/imagenes/bar3.jpg";
import bar4 from "../../assets/imagenes/bar4.jpg";
import sureloj from "../../assets/imagenes/madhatters.jpg";

import poster1 from "../../assets/imagenes/poster1.png";
import poster2 from "../../assets/imagenes/poster2.png";
import poster3 from "../../assets/imagenes/poster3.png";
import poster4 from "../../assets/imagenes/poster4.png";



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
      imagen: "https://vegas411.com/wp-content/uploads/2024/10/Nice-Blossoms-Sakura-3-1024x684.jpg",
      descripcion: "Ron, crema de coco y jugo de piña"
    },
    {
      nombre: "White Rabbit Shot",
      imagen: "https://theblast.prod.media.wordpress.mattersmedia.io/brand-img/123/0x0/2024/11/01160616/Raspberry-No-Gin-Fizz-3-scaled.jpg?",
      descripcion: "Ron, crema de coco y jugo de piña"
    },
    {
      nombre: "Queen’s Sour Elixir",
      imagen: "https://theblast.prod.media.wordpress.mattersmedia.io/brand-img/123/0x0/2024/11/01153534/Its-Time-for-the-Percolator-1.jpg?",
      descripcion: "Whiskey, jugo de limón y jarabe simple"
    },

  ];

  // === Lista de alimentos destacados ===
  const alimentos = [
    {
      nombre: "Hamburguesa BBQ",
      imagen: "https://i.pinimg.com/736x/fe/a9/ec/fea9eccef2e7e1a922201297221434ac.jpg",
      descripcion: "Jugosa hamburguesa con salsa BBQ y queso cheddar"
    },
    {
      nombre: "Cueritos preparados",
      imagen: "https://img.chilango.com/2018/06/unnamed-15-1024x682.jpg",
      descripcion: "Six pack de cueritos con salsa de chile de árbol y limón"
    },
    {
      nombre: "Papas Gajo",
      imagen: "https://cdn.pixabay.com/photo/2020/05/15/18/43/food-5174664_1280.jpg",
      descripcion: "Papas gajo crujientes con especias"
    },
    
  ];

  // === Lista de promociones actuales ===
    const promociones = [
      {
        id: 1,
        nombre: "Happy Hour",
        descripcion: "Disfruta de 2x1 en todas las bebidas de 6 a 8 PM",
        
        imagen: `${poster1}`,
      },
      {
        id: 2,
        nombre: "Noche de Chicas",
        descripcion: "Disfruta de un 20% de descuento en tu cuenta total",
        imagen: `${poster2}`,
      },
      {
        id: 3,
        nombre: "Noche de Chicos",
        descripcion: "Los Miércoles de un 20% de descuento en tu cuenta total.",
        imagen: `${poster3}`,
      },
      {
        id: 4,
        nombre: "Martes de Trivia",
        descripcion: "Participa en nuestra trivia y gana premios especiales",
        imagen: `${poster4}`,
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
              <p className="text-2xl text-[#FFE3A9] font-['Cormorant'] font-bold  not-italic drop-shadow-sm">
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
                  <h3 className="text-20px font-extrabold mb-1">{bebida.nombre}</h3>
                  <p className="text-xl text-[#8CCDEB] font-['Cormorant'] ">{bebida.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === SEPARADOR DECORATIVO === */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-t border-[#8CCDEB]/70 w-3/12 "></div>
          </div>
          <div className="relative flex justify-center ">
            <span className="bg-[#080f24] px-4 font-['Alice'] text-2xl text-[#725CAD] ">
              ✦ ✦ ✦
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
              <div key={alimentos.id} className="  bg-[#0f122e] rounded-sm w-full overflow-hidden shadow-md hover:shadow-[0_0_20px_#725CAD80] transform hover:scale-105 transition duration-500">
                <img
                  src={alimentos.imagen}
                  alt={alimentos.nombre}
                  className="w-full h-130 object-cover "
                />
                <div className="p-4 text-[#FFE3A9] text-center">
                  <h3 className="text-20px font-extrabold mb-1">{alimentos.nombre}</h3>
                  <p className="text-xl text-[#8CCDEB] font-['Cormorant']">{alimentos.descripcion}</p>
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
              <span className="bg-[#080f24] px-4 font-['Alice'] text-[#FFE3A9] text-2xl">
                ✦ ✦ ✦
              </span>
            </div>
          </div>

          {/* === SECCIÓN DE PROMOCIONES === */}
          <section className="py-8 px-6 bg-[#080f24] text-[#FFE3A9] font-['Alice'] text-2xl">
            <h2 className="text-4xl text-center font-bold mb-4 drop-shadow-md">
              Mad Specials
            </h2>
            <p className="text-center text-amber-50 mb-8 font-['Cormorant']">
            It’s always tea time somewhere 
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {promociones.map((promociones) => (
                <div key={promociones.id} className=" bg-[#0f122e] rounded-sm overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-500">
                  <img
                    src={promociones.imagen}
                    alt={promociones.nombre}
                    className="w-full h-160 object-cover "
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
