// Controller for client events: only returns active events
import Event from '../../models/event.js';

export const getActiveEvents = async (req, res) => {
  try {
    const events = await Event.find({ estado: 'activo' });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los eventos activos', error });
  }
};
