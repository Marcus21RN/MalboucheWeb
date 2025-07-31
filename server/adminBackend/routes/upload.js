import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/image', upload.single('file'), uploadImage);

export default router;