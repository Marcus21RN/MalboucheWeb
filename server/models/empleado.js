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
    required: false, 
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
    default: 'activo',
    enum: ['activo', 'inactivo'],
  },
  IDRol: {
    type: String,
    required: true,
    enum: ['ADMIN', 'EMPLE'], 
  },
});

export default mongoose.models.Empleado || mongoose.model('Empleado', empleadoSchema, 'empleado');
