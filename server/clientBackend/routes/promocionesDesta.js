import express from "express";
import { obtenerPromocionesActivas } from "../controllers/promocionesDesta.js";
const router = express.Router();

router.get("/", obtenerPromocionesActivas);

export default router;