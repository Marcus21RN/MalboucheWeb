import express from 'express';

const router = express.Router();



import empleadoRoutes from './routes/empleado.js';
import iotRoutes from './routes/iotRoutes.js';
import productoRoutes from './routes/producto.js';
import menuRoutes from './routes/menu.js';
import eventRoutes from './routes/event.js';
import promocionRoutes from './routes/promocion.js';
import uploadRoutes from './routes/upload.js';



router.use('/empleados', empleadoRoutes);
router.use('/iot', iotRoutes);
router.use('/productos', productoRoutes);
router.use('/menus', menuRoutes);
router.use('/events', eventRoutes);
router.use('/promos', promocionRoutes);
router.use('/upload', uploadRoutes);


export default router;
