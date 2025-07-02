import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import reservationRoutes from './routes/reservations.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

export default app;
