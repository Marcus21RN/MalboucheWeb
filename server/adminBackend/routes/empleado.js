import express from 'express';
import * as empleado from '../controllers/empleado.js';

const router = express.Router();

router.post('/', empleado.crearEmpleado);
router.get('/', empleado.obtenerEmpleados);
router.get('/:id', empleado.obtenerEmpleadoPorId);
router.put('/:id', empleado.actualizarEmpleado);
router.delete('/:id', empleado.eliminarEmpleado);

export default router;
