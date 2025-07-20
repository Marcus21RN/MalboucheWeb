import mongoose from 'mongoose';

const empleadoSchema = new mongoose.Schema({
 _id: {
   type: Number,
   required: true,
 },
  nombre: {
    type: String,
    required: true,
  },
  primerApellido:{
    type: String,
    required: true,
  },
  segundoApellido: {
    type: String,
    required: false, // Este campo es opcional
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
    default: 'activo', // Por defecto, el estado es 'activo'
    enum: ['activo', 'inactivo'], // Valores permitidos para el estado
  },
  IDRol: {
    type: String,
    required: true,
    enum: ['ADMIN', 'EMPLE'], // Valores permitidos para el rol
  },
});

// Evita el error de sobreescritura del modelo
export default mongoose.models.Empleado || mongoose.model('Empleado', empleadoSchema, 'empleado');
