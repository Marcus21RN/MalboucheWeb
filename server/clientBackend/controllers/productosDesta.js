import Producto from "../../models/producto.js";


const CATEGORIAS_DESTACADAS = [
  { categoria: "Licores", imagen: "https://images.unsplash.com/photo-1730698394350-76b6f0ac8e03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { categoria: "Cócteles", imagen: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { categoria: "Bebidas", imagen: "https://images.unsplash.com/photo-1620219365994-f443a86ea626?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { categoria: "Botanas", imagen: "https://images.unsplash.com/photo-1565060299172-42f7895549f0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

export const obtenerDestacadosHome = async (req, res) => {
  try {
    // Para cada categoría, busca hasta 3 productos
    const resultados = await Promise.all(
      CATEGORIAS_DESTACADAS.map(async (cat) => {
        const items = await Producto.aggregate([
          { $match: { categoria: cat.categoria } },
          { $sample: { size: 3 } }
        ]).project("nombre precio descripcion"); // agrega 'imagen' si cada producto tiene imagen propia
        return {
          categoria: cat.categoria,
          imagen: cat.imagen,
          items
        };
      })
    );
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos destacados" });
  }
};