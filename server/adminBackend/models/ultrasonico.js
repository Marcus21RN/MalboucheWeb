import mongoose from 'mongoose';

// Modelo para iot-hc-sr04_Lecturas
const hcSr04Schema = new mongoose.Schema({
  _id: { type: String, required: true },
  distanciaCM: { type: Number, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true }
}, { collection: 'iot-hc-sr04_Lecturas' });

const Ultrasonico = mongoose.models.Ultrasonico || mongoose.model('Ultrasonico', hcSr04Schema);
export default Ultrasonico;