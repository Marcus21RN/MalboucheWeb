import express from 'express';
const router = express.Router();
import empleadoRoutes from './routes/empleado.js';
import iotRoutes from './routes/iotRoutes.js';
// Ruta base: /adminBackend/empleados
router.use('/empleados', empleadoRoutes);
router.use("/iot", iotRoutes);

export default router;
