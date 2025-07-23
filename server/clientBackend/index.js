import express from "express";
import eventRoutes from './routes/events.js';
import reservationRoutes from './routes/reservations.js';

const router = express.Router();

router.use('/events', eventRoutes);
router.use('/reservations', reservationRoutes);

export default router;