import Producto from "../../models/producto.js";


const CATEGORIAS_DESTACADAS = [
  { categoria: "bebidas", imagen: "https://images.unsplash.com/photo-1620219365994-f443a86ea626?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { categoria: "cocteles", imagen: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { categoria: "alimentos", imagen: "https://images.unsplash.com/photo-1565060299172-42f7895549f0?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { categoria: "snacks", imagen: "https://png.pngtree.com/background/20230321/original/pngtree-crispy-potato-chips-in-a-small-cup-picture-image_2153765.jpg" }
];

export const obtenerDestacadosHome = async (req, res) => {
  try {
    // Para cada categoría, busca hasta 3 productos activos
    const resultados = await Promise.all(
      CATEGORIAS_DESTACADAS.map(async (cat) => {
        const items = await Producto.aggregate([
          { $match: { categoria: cat.categoria, estado: "activo" } },
          { $sample: { size: 3 } },
          { $project: { nombre: 1, precio: 1, descripcion: 1, _id: 1 } }
        ]);
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