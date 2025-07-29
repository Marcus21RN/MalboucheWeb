import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
    required: true,
  },
  fechaEvento: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: String,
    required: true,
  },
  horaFinal: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    default: '',
  },
  estado: {
    type: String,
    enum: ['activo', 'cancelado', 'pendiente'],
    default: 'activo',
    required: true,
  },
}, {
  versionKey: false, // elimina "__v"
  timestamps: false  // elimina "createdAt" y "updatedAt"
});

export default mongoose.model('Event', eventSchema, 'evento');
