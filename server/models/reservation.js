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
  numTel: {
    type: Number,
    required: true,
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
  motivoCancel: {
    // Motivo de cancelación, puede ser null si no aplica
    type: String,
    default: null
  },
  estado: {
    type: String,
    enum: ['confirmada', 'cancelada'],
    default: 'confirmada',
    required: true
  }
}, {
  timestamps: false,   //  No agregar createdAt ni updatedAt
  versionKey: false    //  No agregar __v
});

export default mongoose.model('Reservation', reservationSchema, 'reservacion');
