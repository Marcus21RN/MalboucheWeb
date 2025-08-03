import express from "express";
import {
  obtenerLecturasDHT11,
  obtenerLecturasMLX90614,
  obtenerLecturasUltrasonico
} from "../controllers/iot.js";

import {
  getDHT11Stats,
  getUltrasonicoStats,
  getMLX90614Stats
} from "../controllers/iotAggregateController.js";
const router = express.Router();

router.get("/dht11", obtenerLecturasDHT11);
router.get("/ultrasonico", obtenerLecturasUltrasonico);
router.get("/mlx90614", obtenerLecturasMLX90614);

// Endpoints de estadísticas agregadas
router.get("/aggregate/dht11", getDHT11Stats);
router.get("/aggregate/ultrasonico", getUltrasonicoStats);
router.get("/aggregate/mlx90614", getMLX90614Stats);

export default router;