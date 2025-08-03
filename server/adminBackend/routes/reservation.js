
import express from 'express';
import { getReservations, cancelReservation } from '../controllers/reservation.js';
import { filterByWeekday } from '../controllers/reservationAggregate.js';

const router = express.Router();

// GET /admin/reservations?folio=...&nombre=...&estado=...
router.get('/', getReservations);

// PATCH /admin/reservations/:id/cancel
router.patch('/:id/cancel', cancelReservation);

// GET /admin/reservations/by-weekday?weekday=0-6 (0=Domingo, 1=Lunes...)
router.get('/by-weekday', filterByWeekday);

export default router;
