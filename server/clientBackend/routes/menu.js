import express from "express";
import {
  obtenerMenus
} from "../controllers/menu.js";

const router = express.Router();

router.get("/", obtenerMenus);


export default router;