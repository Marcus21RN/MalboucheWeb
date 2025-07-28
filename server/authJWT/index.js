import express from 'express';

const router = express.Router();

import authRoutes from './routes/authRoutes.js';

router.use('/auth', authRoutes);

export default router;
