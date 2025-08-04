import express from "express";
import eventRoutes from './routes/events.js';
import reservationRoutes from './routes/reservations.js';
import menuRoutes from './routes/menu.js';
import obtenerDestacadosHome from './routes/productosDesta.js';
import obtenerPromocionesActivas from './routes/promocionesDesta.js';
import emailRoutes from './routes/email.js';
import feedbackRoutes from './routes/feedback.js'; 


const router = express.Router();

router.use('/events', eventRoutes);
router.use('/reservations', reservationRoutes);
router.use('/menu', menuRoutes);
router.use('/destacados-home', obtenerDestacadosHome);
router.use('/promociones-activas', obtenerPromocionesActivas);
router.use('/email', emailRoutes);
router.use('/feedback', feedbackRoutes);


export default router;