import Promocion from "../../models/promocion.js";

export const obtenerPromocionesActivas = async (req, res) => {
  try {
    const promociones = await Promocion.aggregate([
      { $match: { estado: "activo" } },
      { $sample: { size: 3 } }
    ]);
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener promociones activas" });
  }
};