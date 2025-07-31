// Obtener información de usuario por correo
export const getUserInfoByCorreo = async (req, res) => {
  const { correo } = req.query;
  if (!correo) return res.status(400).json({ error: 'Correo requerido' });
  try {
    const user = await Empleado.findOne({ correo });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({
      id: user._id,
      nombre: user.nombre,
      primerApellido: user.primerApellido,
      segundoApellido: user.segundoApellido,
      correo: user.correo,
      IDRol: user.IDRol,
      estado: user.estado
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno', details: error });
  }
};
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
        primerApellido: user.primerApellido,
        segundoApellido: user.segundoApellido,
        correo: user.correo,
        IDRol: user.IDRol,
        estado: user.estado
      }
    });
  } catch (error) {
    console.log('Error en Login:', error);
    res.status(500).json({ msg: 'Error interno', error });
  }
};