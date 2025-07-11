import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Empleado from '../models/empleado.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'A!@E=MC^2'; // usando dotenv para manejar variables de entorno
// LOGIN
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    const user = await Empleado.findOne({ correo });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        nombre: user.nombre,
        rol: user.IDRol,
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        rol: user.IDRol,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
});

export default router;
