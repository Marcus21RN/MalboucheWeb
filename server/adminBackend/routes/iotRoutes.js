import express from "express";
const router = express.Router();
import {
  obtenerLecturasDHT11,
  obtenerLecturasUltrasonico,
  obtenerLecturasMLX90615
} from "../controllers/iot.js";

router.get("/dht11", obtenerLecturasDHT11);
router.get("/ultrasonico", obtenerLecturasUltrasonico);
router.get("/mlx90615", obtenerLecturasMLX90615);

export default router;