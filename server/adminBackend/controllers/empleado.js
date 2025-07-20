import Empleado from '../models/empleado.js';
import { validarRolExistente } from '../validations/empleadoValidation.js';
import bcrypt from 'bcrypt';

// Crear empleado
export const crearEmpleado = async (req, res) => {
  try {
    const { _id, nombre, primerApellido, segundoApellido, correo, password, estado, IDRol } = req.body;

    const rolValido = await validarRolExistente(IDRol);
    if (!rolValido) return res.status(400).json({ error: 'El IDRol no existe' });

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 5);

    const nuevoEmpleado = new Empleado({ _id, nombre, primerApellido, segundoApellido, correo, password: hashedPassword, estado, IDRol });
    await nuevoEmpleado.save();
    res.status(201).json(nuevoEmpleado);
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
    const { IDRol, password } = req.body;

    if (IDRol) {
      const rolValido = await validarRolExistente(IDRol);
      if (!rolValido) return res.status(400).json({ error: 'El IDRol no existe' });
    }

    // Si se proporciona una nueva contraseña, hashearla antes de actualizar
    let updateData = { ...req.body };
    if (password) {
      updateData.password = await bcrypt.hash(password, 5);
    }

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
