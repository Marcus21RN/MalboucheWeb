import express from "express";
import {
  obtenerDestacadosHome
} from "../controllers/productosDesta.js";

const router = express.Router();

router.get("/", obtenerDestacadosHome);


export default router;