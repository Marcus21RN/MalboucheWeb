import Empleado from '../../models/empleado.js';
import { validarRolExistente } from '../validations/empleadoValidation.js';
import bcrypt from 'bcrypt';

// Crear empleado
export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, primerApellido, segundoApellido, correo, estado, IDRol, confirmPassword } = req.body;

    // Validar contraseña de confirmación del usuario autenticado
    const usuarioId = req.user?.id;
    if (!usuarioId) return res.status(401).json({ error: 'Usuario no autenticado' });
    const usuario = await Empleado.findById(usuarioId);
    if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });
    const validPassword = await bcrypt.compare(confirmPassword, usuario.password);
    if (!validPassword) return res.status(403).json({ error: 'Contraseña de confirmación incorrecta' });

    const rolValido = await validarRolExistente(IDRol);
    if (!rolValido) return res.status(400).json({ error: 'El IDRol no existe' });

    // Obtener el siguiente ID autoincremental
    const count = await Empleado.countDocuments();
    const nextId = count + 1;

    // Generar password por defecto: nombre + primera letra del primer apellido + 123
    const passwordDefault = `${nombre}${primerApellido ? primerApellido.charAt(0) : ''}123`;
    const hashedPassword = await bcrypt.hash(passwordDefault, 5);

    const nuevoEmpleado = new Empleado({
      _id: nextId,
      nombre,
      primerApellido,
      segundoApellido,
      correo,
      password: hashedPassword,
      estado,
      IDRol
    });
    await nuevoEmpleado.save();
    res.status(201).json({
      ...nuevoEmpleado.toObject(),
      passwordDefault // Solo para mostrar la password generada si se requiere
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leer todos
export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leer uno
export const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar
export const actualizarEmpleado = async (req, res) => {
  try {
    const { IDRol, password, confirmPassword } = req.body;

    // Validar contraseña de confirmación del usuario autenticado
    const usuarioId = req.user?.id;
    if (!usuarioId) return res.status(401).json({ error: 'Usuario no autenticado' });
    const usuario = await Empleado.findById(usuarioId);
    if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });
    const validPassword = await bcrypt.compare(confirmPassword, usuario.password);
    if (!validPassword) return res.status(403).json({ error: 'Contraseña de confirmación incorrecta' });

    if (IDRol) {
      const rolValido = await validarRolExistente(IDRol);
      if (!rolValido) return res.status(400).json({ error: 'El IDRol no existe' });
    }

    // Si se proporciona una nueva contraseña, hashearla antes de actualizar
    let updateData = { ...req.body };
    if (password) {
      updateData.password = await bcrypt.hash(password, 5);
    }
    // No guardar confirmPassword en la base de datos
    delete updateData.confirmPassword;

    const actualizado = await Empleado.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar
export const eliminarEmpleado = async (req, res) => {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Empleado eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
