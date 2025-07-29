import bcrypt from 'bcryptjs';
import { generarToken } from '../helpers/jwt.js';
import Empleado from '../../models/empleado.js';
import Rol from '../../models/rol.js';

export const Login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const user = await Empleado.findOne({ correo });
    if (!user || user.estado !== 'activo') {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const rol = await Rol.findById(user.IDRol);
    if (!rol) {
      return res.status(403).json({ msg: 'Rol no válido' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const token = generarToken({ id: user._id, rol: rol._id, nombre: user.nombre });

    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        rol: rol._id
      }
    });
  } catch (error) {
    console.log('Error en Login:', error);
    res.status(500).json({ msg: 'Error interno', error });
  }
};