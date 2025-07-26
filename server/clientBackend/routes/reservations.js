import express from 'express';
import { createReservation } from '../controllers/reservationController.js';
import { validateReservationData, checkReservationAvailability, validateReservationTime } from '../middlewares/reservationValidation.js';

const router = express.Router();

router.post('/', validateReservationData, checkReservationAvailability, validateReservationTime, createReservation);

export default router;
