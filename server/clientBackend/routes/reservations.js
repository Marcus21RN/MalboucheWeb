import express from 'express';
import { createReservation } from '../controllers/reservationController.js';
import { checkPeopleLimitPerDay, validateReservationTime } from '../middlewares/reservationValidation.js';

const router = express.Router();

router.post('/', checkPeopleLimitPerDay, validateReservationTime, createReservation);

export default router;
