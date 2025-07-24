import Promocion from "../../models/promocion.js";

export const obtenerPromociones = async (req, res) => {
  try {
    const promociones = await Promocion.find().sort({ fechaInicio: -1 });
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las promociones" });
  }
};

export const agregarPromocion = async (req, res) => {
  try {
    const { _id, nombre, descripcion, fechaInicio, fechaFin, estado, imagen } = req.body;
    const nuevaPromocion = new Promocion({
      _id,
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      estado,
      imagen: imagen || null
    });
    await nuevaPromocion.save();
    res.status(201).json(nuevaPromocion);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la promoción" });
  }
};

export const actualizarPromocion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fechaInicio, fechaFin, estado, imagen } = req.body;
    const promocionActualizada = await Promocion.findByIdAndUpdate(
      id,
      { nombre, descripcion, fechaInicio, fechaFin, estado, imagen },
      { new: true }
    );
    res.json(promocionActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la promoción" });
  }
};

export const eliminarPromocion = async (req, res) => {
  try {
    const { id } = req.params;
    await Promocion.findByIdAndDelete(id);
    res.json({ mensaje: "Promoción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la promoción" });
  }
};
