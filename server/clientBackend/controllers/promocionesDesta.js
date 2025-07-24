import Promocion from "../../models/promocion.js";

export const obtenerPromocionesActivas = async (req, res) => {
  try {
    const promociones = await Promocion.find({ estado: "activo" });
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener promociones activas" });
  }
};