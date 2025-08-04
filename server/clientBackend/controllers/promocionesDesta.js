import Promocion from "../../models/promocion.js";

export const obtenerPromocionesActivas = async (req, res) => {
  try {
    // Muestra todas las promociones activas, sin limitar a 3
    const promociones = await Promocion.find({ estado: "activo" });
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener promociones activas" });
  }
};