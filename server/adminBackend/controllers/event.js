
import Event from '../../models/event.js';


// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};


// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};


// Create a new event
export const createEvent = async (req, res) => {
  try {
    // Accept both 'fecha' and 'fechaEvento' from frontend
    let fechaEvento = req.body.fechaEvento || req.body.fecha;
    if (fechaEvento) {
      fechaEvento = new Date(fechaEvento);
    }
    const data = {
      ...req.body,
      fechaEvento,
      estado: req.body.estado || 'pendiente',
    };
    const newEvent = new Event(data);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
};


// Update an event
export const updateEvent = async (req, res) => {
  try {
    let fechaEvento = req.body.fechaEvento || req.body.fecha;
    if (fechaEvento) {
      fechaEvento = new Date(fechaEvento);
    }
    const data = {
      ...req.body,
      fechaEvento,
      estado: req.body.estado || 'pendiente',
    };
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
};

