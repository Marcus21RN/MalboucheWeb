import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  cantidadPersonas: {
    type: Number,
    required: true
  },
  horaInicio: {
    type: String,
    required: true
  },
  horaFinal: {
    type: String,
    required: true
  },
  correoCliente: {
    type: String,
    required: true
  },
  cliente: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'cancelada', 'finalizada'],
    default: 'pendiente'
  },
  fecha: {
    type: Date,
    required: true
  },
  numeroMesa: {
    type: Number,
    required: true
  }
}, {
  timestamps: false,   //  No agregar createdAt ni updatedAt
  versionKey: false    //  No agregar __v
});

export default mongoose.model('Reservation', reservationSchema, 'reservacion'); // 'reservacion' es el nombre de la colección en MongoDB
