import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  nombreCliente: {
    type: String,
    required: true
  },
  primerApell: {
    type: String,
    required: true
  },
  segundoApell: {
    type: String,
    required: false // Este campo es opcional
  },
  correoCliente:{
    type: String,
    required:true
  },
  fecha:{
    type: Date,
    required: true
  },
  horaInicio: {
    type: String,
    required: true
  },
  cantidadPersonas: {
    type: Number,
    required: true
  },
  fechaReservacion: {
    type: Date,
    default: Date.now, // Por defecto, la fecha de reservación es la fecha actual
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente',
    required: true
  }
}, {
  timestamps: false,   //  No agregar createdAt ni updatedAt
  versionKey: false    //  No agregar __v
});

export default mongoose.model('Reservation', reservationSchema, 'reservacion'); // 'reservacion' es el nombre de la colección en MongoDB
