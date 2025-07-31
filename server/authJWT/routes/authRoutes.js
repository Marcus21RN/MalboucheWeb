import { Router } from 'express';
import { Login, getUserInfoByCorreo } from '../controllers/authController.js';

const router = Router();

router.post('/login', Login);
router.get('/userinfo', getUserInfoByCorreo);

export default router;
