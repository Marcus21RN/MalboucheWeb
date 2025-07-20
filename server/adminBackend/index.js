import express from 'express';
const router = express.Router();
import empleadoRoutes from './routes/empleado.js';

// Ruta base: /adminBackend/empleados
router.use('/empleados', empleadoRoutes);

export default router;
