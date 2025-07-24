

import React, { useState, useEffect, useRef} from "react";

import { Parallax } from 'react-scroll-parallax';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuPage() {
  const [menuData, setMenuData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showSearch, setShowSearch] = useState(false);
const [showFilter, setShowFilter] = useState(false);
  
  const bannerImages = {
  Beer: 'https://images.unsplash.com/photo-1620219365994-f443a86ea626?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Wine: 'https://images.unsplash.com/photo-1548025396-689d647d00c5?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Food: 'https://images.unsplash.com/photo-1565060299172-42f7895549f0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Cocktails: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // etc.
  };
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      // Simulación de respuesta de la base de datos
      const fakeDataFromDB = [
        {
          nombre: "Craft Beer",
          descripcion: "Selección de cervezas artesanales",
          tipoMenu: "Beer",
          estado: "activo",
          productos: [
            { nombre: "IPA", descripcion: "Cítrica y amarga", precio: 7 },
            { nombre: "Stout", descripcion: "Cremosa con notas a chocolate", precio: 8 },
          ],
        },
        {
          nombre: "Comercial Beer",
          descripcion: "Selección de cervezas comerciales",
          tipoMenu: "Beer",
          estado: "activo",
          productos: [
            { nombre: "IPA", descripcion: "Cítrica y amarga", precio: 7 },
            { nombre: "Stout", descripcion: "Cremosa con notas a chocolate", precio: 8 },
            { nombre: "Lager", descripcion: "Suave y refrescante", precio: 6 },
            { nombre: "Pale Ale", descripcion: "Equilibrada y aromática", precio: 7 },

          ],
        },
        {
          nombre: "White Wine",
          descripcion: "Vinos blancos elegantes",
          tipoMenu: "Cocktails",
          estado: "activo",
          productos: [
            { nombre: "Chardonnay", descripcion: "Afrutado y seco", precio: 9 },
            { nombre: "Sauvignon Blanc", descripcion: "Fresco y herbal", precio: 10 },
          ],
        },
        {
          nombre: "Red Wine",
          descripcion: "Vinos blancos elegantes",
          tipoMenu: "Wine",
          estado: "activo",
          productos: [
            { nombre: "Chardonnay", descripcion: "Afrutado y seco", precio: 9 },
            { nombre: "Sauvignon Blanc", descripcion: "Fresco y herbal", precio: 10 },
          ],
        },       
        {
          nombre: "Snacks",
          descripcion: "Para picar",
          tipoMenu: "Food",
          estado: "activo",
          productos: [
            { nombre: "Nachos", descripcion: "Con queso y jalapeños", precio: 6 },
            { nombre: "Papas", descripcion: "Fritas y crujientes", precio: 4 },
          ],
        },
      ];

      // Agrupar por tipoMenu
      const grouped = fakeDataFromDB.reduce((acc, item) => {
        if (!acc[item.tipoMenu]) {
          acc[item.tipoMenu] = [];
        }
        acc[item.tipoMenu].push({
          ...item,
         
        });
        return acc;
      }, {});

      setMenuData(grouped);
    };

    fetchMenuData();
  }, []);

  // Manejo de clics fuera del contenedor para cerrar búsqueda y filtro
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* === BANNER PRINCIPAL === */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Imagen Parallax */}
        <Parallax speed={-40}>
          <img
            src={'https://media.istockphoto.com/id/1225058372/photo/close-up-of-barman-finishes-preparation-of-alcoholic-cocktail-pouring-drink-in-multicolored.jpg?s=2048x2048&w=is&k=20&c=SJ-V-XuAKAa4ZMhs6NQR7Y7FTcGUg8kHkozqScA-bO4='}
            alt="Bar Banner"
            className="w-full h-full object-cover scale-150"
          />
        </Parallax>
        {/* Contenido encima del fondo */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-start pl-40 h-full px-4">
          <div className="mb-8">
            <div className="w-16 h-1 bg-white mb-5"></div>
            <h1 className="font-['oswald'] font-semibold text-6xl text-white drop-shadow-md">
              <span className="block">TRY OUT OUR MENU</span>
            </h1>
          </div>
        </div>
      </div>
      <section
        ref={containerRef}
        className="bg-gradient-to-b from-[#1e00188a] to-[#3e0132] text-white font-['oswald'] py-8 px-6"
      >
        <div className="flex flex-col items-end w-full space-y-4">
          <div className="relative flex items-center gap-4">

            {/* Filtro flotante */}
            <AnimatePresence>
              {showFilter && (
                <motion.select
                  key="filter-dropdown"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1.5 rounded border border-gray-400 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b76ba3] shadow"
                >
                  <option value="Todos">All</option>
                  {Object.keys(menuData).map((tipoMenu, i) => (
                    <option key={i} value={tipoMenu}>{tipoMenu}</option>
                  ))}
                </motion.select>
              )}
            </AnimatePresence>

            {/* Contenedor del input + icono que se mueve juntos */}
            <motion.div
              animate={{ x: showFilter ? -220 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 absolute right-8 top-1/2 -translate-y-1/2 z-10"
            >
              {/* Input de búsqueda (condicional) */}
              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search Something..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1.5 rounded border border-gray-400 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b76ba3] shadow"
                  />
                )}
              </AnimatePresence>

              {/* Icono de búsqueda SIEMPRE visible */}
              <button
                onClick={() => {
                  setShowSearch(!showSearch);
                  if (!showSearch) setShowFilter(false);
                }}
                className="text-white hover:text-[#b76ba3] transition z-20 "
                >
                <FaSearch size={25} />
              </button>
            </motion.div>
            {/* Botón de filtro */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="text-white hover:text-[#b76ba3] transition z-20"
            >
              <FaFilter size={25} />
            </button>
          </div>
        </div>
      </section>

      {/* === SECCIÓN DE MENÚS === */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {Object.entries(menuData)
          .filter(([tipoMenu, menus]) => {
            if (selectedCategory !== 'Todos' && selectedCategory !== tipoMenu) return false;

            // Si no hay búsqueda, mostrar siempre
            if (!searchTerm) return true;

            const lowerSearch = searchTerm.toLowerCase();

            // Verifica si hay al menos un menú o producto que coincida
            return menus.some(menu => {
              const matchMenuName = menu.nombre.toLowerCase().includes(lowerSearch);
              const matchTipoMenu = tipoMenu.toLowerCase().includes(lowerSearch);
              const matchProducto = menu.productos.some(producto =>
                producto.nombre.toLowerCase().includes(lowerSearch) ||
                producto.descripcion.toLowerCase().includes(lowerSearch)
              );
              return matchMenuName || matchTipoMenu || matchProducto;
            });
         })
         .map(([tipoMenu, menus], i) => {
            const lowerSearch = searchTerm.toLowerCase();
            const matchTipoMenu = tipoMenu.toLowerCase().includes(lowerSearch);
            const mostrarBanner = !searchTerm || matchTipoMenu || selectedCategory === tipoMenu;
            return (
            <div key={i} className="mb-24">
            {/* Banner solo si aplica */}
            {mostrarBanner && (
              <div className="relative w-full h-64 mb-6 rounded-md overflow-hidden shadow-lg">
                <Parallax speed={-20}>
                  <img
                    src={bannerImages[tipoMenu]}
                    alt={`${tipoMenu} banner`}
                    className="w-full h-full object-cover brightness-75"
                  />
                </Parallax>
                <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold font-['Oswald'] text-white">
                  {tipoMenu.toUpperCase()}
                </h1>
              </div>
            )}
            <div className={`${menus.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-10' : ''}`}>
              {menus.map((menu, j) => {
                const matchMenuName = menu.nombre.toLowerCase().includes(lowerSearch);
                const filteredProductos = !searchTerm || matchMenuName || matchTipoMenu
                ? menu.productos
                : menu.productos.filter(producto =>
                  producto.nombre.toLowerCase().includes(lowerSearch) ||
                  producto.descripcion.toLowerCase().includes(lowerSearch)
                );
                if (filteredProductos.length === 0) return null;
                return (
                  <div key={j} className="border border-[#b76ba3] rounded-sm p-6 bg-[#111418] shadow-md">
                    <h2 className="text-4xl font-bold font-['Oswald'] mb-4 text-[#b34789] uppercase text-center">
                      {menu.nombre}
                    </h2>
                    {filteredProductos.map((producto, k) => (
                      <div key={k} className="mb-6 border-b border-[#660152] pb-4">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-xl font-['oswald'] font-bold text-white tracking-wider">
                            {producto.nombre}
                          </h3>
                          <span className="font-['montserrat'] font-bold text-[#b34789]">
                            ${producto.precio.toFixed(2)} MXN
                          </span>
                        </div>
                        <p className="text-white font-['montserrat'] italic">{producto.descripcion}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            </div>
            );
        })}
      </div>
    </div>
  );
}