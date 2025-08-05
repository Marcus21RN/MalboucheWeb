import express from "express";
import {
  obtenerLecturasDHT11,
  obtenerLecturasMLX90614,
  obtenerLecturasUltrasonico,
  obtenerHistoricoDHT11,
  obtenerHistoricoUltrasonico,
  obtenerHistoricoMLX90614
} from "../controllers/iot.js";

import { exportSensorHistoryPDF } from '../controllers/pdfExport.js';
import {
  getDHT11Stats,
  getUltrasonicoStats,
  getMLX90614Stats
} from "../controllers/iotAggregateController.js";
const router = express.Router();

router.get("/dht11", obtenerLecturasDHT11);
router.get("/ultrasonico", obtenerLecturasUltrasonico);
router.get("/mlx90614", obtenerLecturasMLX90614);

// Endpoints históricos filtrables por fecha/hora
router.get("/historico/dht11", obtenerHistoricoDHT11);
router.get("/historico/ultrasonico", obtenerHistoricoUltrasonico);
router.get("/historico/mlx90614", obtenerHistoricoMLX90614);

// Endpoints de estadísticas agregadas
router.get("/aggregate/dht11", getDHT11Stats);
router.get("/aggregate/ultrasonico", getUltrasonicoStats);
router.get("/aggregate/mlx90614", getMLX90614Stats);


// Exportar PDF de histórico
router.post('/historico/export/pdf', exportSensorHistoryPDF);

export default router;