import express from "express";
import {
  obtenerPromociones,
  agregarPromocion,
  actualizarPromocion,
  eliminarPromocion
} from "../controllers/promocion.js";

const router = express.Router();

router.get("/", obtenerPromociones);
router.post("/", agregarPromocion);
router.put("/:id", actualizarPromocion);
router.delete("/:id", eliminarPromocion);

export default router;