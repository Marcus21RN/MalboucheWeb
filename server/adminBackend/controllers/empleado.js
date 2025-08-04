import Empleado from '../../models/empleado.js';
import { validarRolExistente } from '../validations/empleadoValidation.js';
import bcrypt from 'bcrypt';

// Crear empleado
export const crearEmpleado = async (req, res) => {
  try {
    const { nombre, primerApellido, segundoApellido, correo, estado, IDRol, confirmPassword } = req.body;

    // Validar contraseña de confirmación del usuario autenticado
    const usuarioId = req.user?.id;
    if (!usuarioId) {
      console.error('User not authenticated');
      return res.status(401).json({ error: 'You are not authenticated.' });
    }
    const usuario = await Empleado.findById(usuarioId);
    if (!usuario) {
      console.error('Authenticated user not found');
      return res.status(401).json({ error: 'Authenticated user not found.' });
    }
    const validPassword = await bcrypt.compare(confirmPassword, usuario.password);
    if (!validPassword) {
      return res.status(403).json({ error: 'Incorrect confirmation password.' });
    }

    const rolValido = await validarRolExistente(IDRol);
    if (!rolValido) {
      return res.status(400).json({ error: 'Selected role does not exist.' });
    }

    // Validar si el correo ya está registrado
    const existingEmail = await Empleado.findOne({ correo });
    if (existingEmail) {
      return res.status(400).json({ error: 'This email is already registered. Please use another email.' });
    }

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
      passwordDefault // Only for showing the generated password if needed
    });
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ error: 'Could not create employee. Please try again.' });
  }
};

// Leer todos
export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Could not fetch employees. Please try again.' });
  }
};

// Leer uno
export const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Employee not found.' });
    }
    res.json(empleado);
  } catch (err) {
    console.error('Error fetching employee by ID:', err);
    res.status(500).json({ error: 'Could not fetch employee. Please try again.' });
  }
};

// Actualizar
export const actualizarEmpleado = async (req, res) => {
  try {
    const { IDRol, password, confirmPassword } = req.body;

    // Validar contraseña de confirmación del usuario autenticado
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      console.error('User not authenticated');
      return res.status(401).json({ error: 'You are not authenticated.' });
    }
    const usuario = await Empleado.findById(usuarioId);
    if (!usuario) {
      console.error('Authenticated user not found');
      return res.status(401).json({ error: 'Authenticated user not found.' });
    }
    const validPassword = await bcrypt.compare(confirmPassword, usuario.password);
    if (!validPassword) {
      return res.status(403).json({ error: 'Incorrect confirmation password.' });
    }

    if (IDRol) {
      const rolValido = await validarRolExistente(IDRol);
      if (!rolValido) {
        return res.status(400).json({ error: 'Selected role does not exist.' });
      }
    }

    // Validar si el correo ya está registrado por otro empleado
    if (req.body.correo) {
      const existingEmail = await Empleado.findOne({ correo: req.body.correo, _id: { $ne: req.params.id } });
      if (existingEmail) {
        return res.status(400).json({ error: 'This email is already registered. Please use another email.' });
      }
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
    console.error('Error updating employee:', err);
    res.status(500).json({ error: 'Could not update employee. Please try again.' });
  }
};

