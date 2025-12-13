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
  const start = Date.now();
  console.log(`[getEventById] Inicio: ${new Date().toISOString()} - id=${req.params.id}`);
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      const duration = Date.now() - start;
      console.log(`[getEventById] No encontrado: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`);
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
    const duration = Date.now() - start;
    console.log(`[getEventById] Fin: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[getEventById] Error: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`, error);
    res.status(500).json({ message: 'Error fetching event', error });
  }
};


// Create a new event
export const createEvent = async (req, res) => {
  const start = Date.now();
  console.log(`[createEvent] Inicio: ${new Date().toISOString()}`);
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
    const duration = Date.now() - start;
    console.log(`[createEvent] Fin: ${new Date().toISOString()} - Duración: ${duration}ms - id=${newEvent._id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[createEvent] Error: ${new Date().toISOString()} - Duración: ${duration}ms`, error);
    res.status(400).json({ message: 'Error creating event', error });
  }
};


// Update an event
export const updateEvent = async (req, res) => {
  const start = Date.now();
  console.log(`[updateEvent] Inicio: ${new Date().toISOString()} - id=${req.params.id}`);
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
    if (!updatedEvent) {
      const duration = Date.now() - start;
      console.log(`[updateEvent] No encontrado: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`);
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
    const duration = Date.now() - start;
    console.log(`[updateEvent] Fin: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[updateEvent] Error: ${new Date().toISOString()} - Duración: ${duration}ms - id=${req.params.id}`, error);
    res.status(400).json({ message: 'Error updating event', error });
  }
};

