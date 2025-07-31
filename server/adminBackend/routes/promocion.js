import express from 'express';
import { getPromociones, createPromocion, updatePromocion, deletePromocion } from '../controllers/promocionController.js';

const router = express.Router();

router.get('/', getPromociones);
router.post('/', createPromocion);
router.put('/:id', updatePromocion);
router.delete('/:id', deletePromocion);

export default router;
