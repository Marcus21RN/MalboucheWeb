import express from "express";
import {
  obtenerLecturasDHT11,
  obtenerLecturasMLX90614,
  obtenerLecturasUltrasonico
} from "../controllers/iot.js";
const router = express.Router();

router.get("/dht11", obtenerLecturasDHT11);
router.get("/ultrasonico", obtenerLecturasUltrasonico);
router.get("/mlx90614", obtenerLecturasMLX90614);

export default router;