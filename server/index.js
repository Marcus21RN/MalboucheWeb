import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import eventRoutes from './clientBackend/routes/events.js';
import reservationRoutes from './clientBackend/routes/reservations.js';
import connectDB from './config/db.js';
import authRoutes from './userBackend/routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

export default app;
