import Event from '../../models/event.js';

// Obtener todos los eventos
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener eventos', error });
  }
};

// Obtener un evento por ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Evento no encontrado' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener evento', error });
  }
};

// Crear un nuevo evento
export const createEvent = async (req, res) => {
  try {
    const data = {
      ...req.body,
      estado: req.body.estado || 'activo',
    };
    const newEvent = new Event(data);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear evento', error });
  }
};

// Actualizar un evento
export const updateEvent = async (req, res) => {
  try {
    const data = {
      ...req.body,
      estado: req.body.estado || 'activo',
    };
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Evento no encontrado' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar evento', error });
  }
};

// Eliminar un evento
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Evento no encontrado' });
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar evento', error });
  }
};
