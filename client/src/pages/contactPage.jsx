export default function contactPage() {
    return(
    <>
        <section className="py-12 px-6">
                {/* === SECCIÓN "SOBRE NOSOTROS" === */}
            <h2 className="text-2xl font-bold text-center mb-6">Sobre nosotros</h2>

            {/* Contenido sobre la historia y filosofía del bar */}
            <div className="max-w-3xl mx-auto text-center-justify text-gray-700">
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
    </> 
    );
}