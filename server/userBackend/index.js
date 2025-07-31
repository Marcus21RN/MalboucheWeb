import express from "express";
import promocion from './routes/promocion.js';
import menuRoutes from './routes/menu.js';
import productoRoutes from './routes/producto.js';

const router = express.Router();

router.use("/menu", menuRoutes);
router.use("/producto", productoRoutes);
router.use("/promocion", promocion);

export default router;