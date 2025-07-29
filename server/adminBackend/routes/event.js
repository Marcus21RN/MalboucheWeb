import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/event.js';

const router = express.Router();

// Obtener todos los eventos
router.get('/', getEvents);

// Obtener un evento por ID
router.get('/:id', getEventById);

// Crear un nuevo evento
router.post('/', createEvent);

// Actualizar un evento
router.put('/:id', updateEvent);

// Eliminar un evento
router.delete('/:id', deleteEvent);

export default router;
