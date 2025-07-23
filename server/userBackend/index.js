import express from "express";
import galeriaRoutes from "./routes/galeria.js";
import authRoutes from './routes/authRoutes.js';
import promocion from './routes/promocion.js';
import menuRoutes from './routes/menu.js';
import productoRoutes from './routes/producto.js';

const router = express.Router();

router.use("/galeria", galeriaRoutes);
router.use("/auth", authRoutes);
router.use("/menu", menuRoutes);
router.use("/producto", productoRoutes);
router.use("/promocion", promocion);

export default router;