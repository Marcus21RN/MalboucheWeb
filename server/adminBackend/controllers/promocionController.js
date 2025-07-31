import Promocion from '../../models/promocion.js';

// Obtener todas las promociones
export const getPromociones = async (req, res) => {
  try {
    const promos = await Promocion.find();
    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener promociones', error });
  }
};

// Crear una nueva promoción
export const createPromocion = async (req, res) => {
  try {
    // Contar promociones existentes para generar el siguiente ID
    const count = await Promocion.countDocuments();
    const nextId = `PROMO${count + 1}`;
    const nuevaPromo = new Promocion({ ...req.body, _id: nextId });
    await nuevaPromo.save();
    res.status(201).json(nuevaPromo);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear promoción', error });
  }
};

// Actualizar una promoción
export const updatePromocion = async (req, res) => {
  try {
    const { id } = req.params;
    const promoActualizada = await Promocion.findByIdAndUpdate(id, req.body, { new: true });
    if (!promoActualizada) return res.status(404).json({ message: 'Promoción no encontrada' });
    res.json(promoActualizada);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar promoción', error });
  }
};

// Eliminar una promoción
export const deletePromocion = async (req, res) => {
  try {
    const { id } = req.params;
    const promoEliminada = await Promocion.findByIdAndDelete(id);
    if (!promoEliminada) return res.status(404).json({ message: 'Promoción no encontrada' });
    res.json({ message: 'Promoción eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar promoción', error });
  }
};
