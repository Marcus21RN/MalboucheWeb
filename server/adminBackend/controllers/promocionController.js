import Promocion from '../../models/promocion.js';

// Utilidades para formateo de tiempo
const formatTime = (d = new Date()) => d.toLocaleString(); // hora legible
const formatDuration = (ms) => `${ms} ms (${(ms / 1000).toFixed(3)} s)`;

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
  const start = Date.now();
  console.log(`[createPromocion] Inicio: ${formatTime()}`);
  try {
    // Contar promociones existentes para generar el siguiente ID
    const count = await Promocion.countDocuments();
    const nextId = `PROMO${count + 1}`;
    const nuevaPromo = new Promocion({ ...req.body, _id: nextId });
    await nuevaPromo.save();
    res.status(201).json(nuevaPromo);
    const duration = Date.now() - start;
    console.log(`[createPromocion] Fin: ${formatTime()} | Duración: ${formatDuration(duration)} | id=${nuevaPromo._id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[createPromocion] Error: ${formatTime()} | Duración: ${formatDuration(duration)}`, error);
    res.status(400).json({ message: 'Error al crear promoción', error });
  }
};

// Actualizar una promoción
export const updatePromocion = async (req, res) => {
  const start = Date.now();
  const { id } = req.params;
  console.log(`[updatePromocion] Inicio: ${formatTime()} | id=${id}`);
  try {
    const promoActualizada = await Promocion.findByIdAndUpdate(id, req.body, { new: true });
    if (!promoActualizada) {
      const duration = Date.now() - start;
      console.log(`[updatePromocion] No encontrada: ${formatTime()} | Duración: ${formatDuration(duration)} | id=${id}`);
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }
    res.json(promoActualizada);
    const duration = Date.now() - start;
    console.log(`[updatePromocion] Fin: ${formatTime()} | Duración: ${formatDuration(duration)} | id=${id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[updatePromocion] Error: ${formatTime()} | Duración: ${formatDuration(duration)} | id=${id}`, error);
    res.status(400).json({ message: 'Error al actualizar promoción', error });
  }
};

// Eliminar una promoción
export const deletePromocion = async (req, res) => {
  const start = Date.now();
  const { id } = req.params;
  console.log(`[deletePromocion] Inicio: ${formatTime()} | id=${id}`);
  try {
    const promoEliminada = await Promocion.findByIdAndDelete(id);
    if (!promoEliminada) {
      const duration = Date.now() - start;
      console.log(`[deletePromocion] No encontrada: ${formatTime()} | Duración: ${formatDuration(duration)} | id=${id}`);
      return res.status(404).json({ message: 'Promoción no encontrada' });
    }
    res.json({ message: 'Promoción eliminada' });
    const duration = Date.now() - start;
    console.log(`[deletePromocion] Fin: ${formatTime()} | Duración: ${formatDuration(duration)} | id=${id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[deletePromocion] Error: ${formatTime()} | Duración: ${formatDuration(duration)} | id=${id}`, error);
    res.status(400).json({ message: 'Error al eliminar promoción', error });
  }
};
