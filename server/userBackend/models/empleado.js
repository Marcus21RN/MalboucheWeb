import mongoose from 'mongoose';

const empleadoSchema = new mongoose.Schema({
  _id: Number,
  nombre: String,
  primerApellido: String,
  segundoApellido: { type: String, default: null },
  correo: String, 
  password: String,
  estado: String,
  IDRol: String,
});

export default mongoose.model('Empleado', empleadoSchema, 'empleado');
