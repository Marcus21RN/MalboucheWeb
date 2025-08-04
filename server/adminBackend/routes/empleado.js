import express from 'express';
import * as empleado from '../controllers/empleado.js';
import { validarJWT } from '../../authJWT/middlewares/validarJwt.js';

const router = express.Router();

router.post('/', validarJWT, empleado.crearEmpleado);
router.get('/', empleado.obtenerEmpleados);
router.get('/:id', empleado.obtenerEmpleadoPorId);
router.put('/:id', validarJWT, empleado.actualizarEmpleado);

export default router;
