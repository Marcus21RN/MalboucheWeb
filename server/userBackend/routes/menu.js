import express from "express";
import {
  obtenerMenus,
  agregarMenu,
  actualizarMenu,
  eliminarMenu
} from "../controllers/menu.js";

const router = express.Router();

router.get("/", obtenerMenus);
router.post("/", agregarMenu);
router.put("/:id", actualizarMenu);
router.delete("/:id", eliminarMenu);

export default router;