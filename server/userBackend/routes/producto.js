import express from "express";
import {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/producto.js";

const router = express.Router();

router.get("/", obtenerProductos);
router.post("/", agregarProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;