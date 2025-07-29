import express from "express";
import {
  getActiveEvents
} from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getActiveEvents);


export default router;