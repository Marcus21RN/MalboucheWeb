/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef} from "react";

import { Parallax } from 'react-scroll-parallax';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function MenuPage() {
  const [menuData, setMenuData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
  const bannerImages = {
  bebidas: 'https://animalgourmet.com/wp-content/uploads/2018/05/christin-hume-370431-unsplash-e1527803357279.jpg',
  alimentos: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2023/02/camarera-llevando-comida-mesa-2958558.jpg?tf=3840x',
  snacks: 'https://mistersnacks.com/wp-content/uploads/2019/01/Micro-Brews-and-their-Perfect-Snack-Match-scaled.jpeg',
  cocteles: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // etc.
  };
  const containerRef = useRef(null);

 useEffect(() => {
  const fetchMenuData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/clientBackend/menu");
      // Agrupa los menús por tipoMenu como antes
      const grouped = res.data.reduce((acc, item) => {
        if (!acc[item.tipoMenu]) acc[item.tipoMenu] = [];
        acc[item.tipoMenu].push(item);
        return acc;
      }, {});
      setMenuData(grouped);
    } catch (error) {
      console.error("Error al obtener los menús:", error);
      setMenuData({});
    }
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
        <Parallax speed={-20}>
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
        className=" text-white font-['oswald'] py-8 px-6 mr-45"
      >
        <div className="flex flex-col items-end w-full space-y-4 ">
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 w-full sm:w-auto">

            {/* Filtro flotante */}
            <AnimatePresence>
              {showFilter && (
                <motion.select
                  key="filter-dropdown"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: window.innerWidth < 640 ? '100%' : 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 rounded border border-gray-400 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b76ba3] shadow"
                >
                  <option value="Todos">All</option>
                  {Object.keys(menuData).map((tipoMenu, i) => (
                    <option key={i} value={tipoMenu}>{tipoMenu}</option>
                  ))}
                </motion.select>
              )}
            </AnimatePresence>

            {/* Input búsqueda */}
            <motion.div
              animate={{
                x: showFilter && window.innerWidth >= 640 ? -220 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 w-full sm:w-auto sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2 z-10"
            >
              {/* Input búsqueda */}
              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    key="search-input"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: window.innerWidth < 640 ? '100%' : 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search Something..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1.5 rounded border border-gray-400 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b76ba3] shadow"
                  />
                )}
              </AnimatePresence>

              {/* Ícono búsqueda */}
              <button
                onClick={() => {
                  setShowSearch(!showSearch);
                  if (!showSearch) setShowFilter(false);
                }}
                className="text-[#b76ba3] hover:text-white transition z-20"
              >
                <FaSearch size={25} />
              </button>
            </motion.div>

            {/* Ícono filtro */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="text-[#b76ba3] hover:text-white transition z-20"
            >
              <FaFilter size={25} />
            </button>
          </div>
        </div>
      </section>


      {/* === SECCIÓN DE MENÚS === */}
      <div className="px-4 py-10 max-w-7xl mx-auto space-y-6">
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
                producto.IDProducto?.nombre.toLowerCase().includes(lowerSearch) ||
                producto.IDProducto?.descripcion.toLowerCase().includes(lowerSearch)
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
              <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-82 mb-15 rounded-none overflow-hidden shadow-lg">
                <Parallax speed={-30} opacity={[0.7, 1]} scale={[1.1, 1]}>
                  <img
                    src={bannerImages[tipoMenu]}
                    alt={`${tipoMenu} banner`}
                    className="w-full h-full object-cover brightness-85"
                    style={{ minHeight: "100%", minWidth: "100%" }}
                  />
                </Parallax>
                <h1 className="absolute inset-0 flex items-center justify-center text-5xl font-bold font-['Oswald'] text-white drop-shadow-lg">
                  {tipoMenu.toUpperCase()}
                </h1>
              </div>
            )}
            <div className={`${menus.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}`}>
              {menus.map((menu, j) => {
                const matchMenuName = menu.nombre.toLowerCase().includes(lowerSearch);
                const filteredProductos = !searchTerm || matchMenuName || matchTipoMenu
                ? menu.productos
                : menu.productos.filter(producto =>
                  producto.IDProducto.nombre.toLowerCase().includes(lowerSearch) ||
                  producto.IDProducto.descripcion.toLowerCase().includes(lowerSearch)
                );
                if (filteredProductos.length === 0) return null;
                return (
                  <div key={j} className="border border-[#b76ba3] rounded-sm p-6 bg-[#111418] shadow-md">
                    <h2 className="text-4xl font-bold font-['Oswald'] mb-2 text-[#b34789] uppercase text-center">
                      {menu.nombre}
                    </h2>
                    {menu.descripcion && (
                      <p className="text-lg font-['montserrat'] text-white text-center mb-4">
                        {menu.descripcion}
                      </p>
                    )}
                    {filteredProductos.map((producto, k) => (
                      <div key={k} className="mb-6 border-b border-[#660152] pb-4">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-xl font-['oswald'] font-bold text-white tracking-wider">
                            {producto.IDProducto?.nombre || "Sin nombre"}
                          </h3>
                          <span className="font-['montserrat'] font-bold text-[#b34789]">
                            {producto.IDProducto && typeof producto.IDProducto.precio === "number"
                              ? `$${producto.IDProducto.precio.toFixed(2)} MXN`
                              : "Precio no disponible"}
                          </span>
                        </div>
                        <p className="text-white font-['montserrat'] italic">{producto.IDProducto?.descripcion || ""}</p>
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
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-[#660152c9] text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-[#b76ba3] transition"
      >
        <IoIosArrowUp size={24} />
      </button>
    </div>
  );
}