import express from "express";
import {
  obtenerGaleria,
  agregarImagen,
  actualizarImagen,
  eliminarImagen
} from "../controllers/galeria.js";

const router = express.Router();

router.get("/", obtenerGaleria);
router.post("/", agregarImagen);
router.put("/:id", actualizarImagen);
router.delete("/:id", eliminarImagen);

export default router;