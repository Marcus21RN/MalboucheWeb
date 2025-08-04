import express from 'express';

const router = express.Router();




import empleadoRoutes from './routes/empleado.js';
import iotRoutes from './routes/iotRoutes.js';
import productoRoutes from './routes/producto.js';
import menuRoutes from './routes/menu.js';
import eventRoutes from './routes/event.js';
import promocionRoutes from './routes/promocion.js';
import uploadRoutes from './routes/upload.js';
import emailRoutes from './routes/email.js';
import reservationRoutes from './routes/reservation.js';
import emailReservaRoutes from './routes/emailReserva.js';



router.use('/empleados', empleadoRoutes);
router.use('/iot', iotRoutes);
router.use('/productos', productoRoutes);
router.use('/menus', menuRoutes);
router.use('/events', eventRoutes);
router.use('/promos', promocionRoutes);
router.use('/upload', uploadRoutes);
router.use('/email', emailRoutes);
router.use('/reservations', reservationRoutes);
router.use('/email-reserva', emailReservaRoutes);



export default router;
