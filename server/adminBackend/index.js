import express from 'express';

const router = express.Router();


import empleadoRoutes from './routes/empleado.js';
import iotRoutes from './routes/iotRoutes.js';
import productoRoutes from './routes/producto.js';
import menuRoutes from './routes/menu.js';


router.use('/empleados', empleadoRoutes);
router.use('/iot', iotRoutes);
router.use('/productos', productoRoutes);
router.use('/menus', menuRoutes);


export default router;
