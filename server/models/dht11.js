import mongoose from 'mongoose';

// Modelo para iot-dht11_Lecturas
const dht11Schema = new mongoose.Schema({
  _id: { type: String, required: true },
  temperaturaC: { type: Number, required: true },
  humedad: { type: Number, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true }
}, { collection: 'iot-dht11_Lecturas' });

const DHT11 = mongoose.models.DHT11 || mongoose.model('DHT11', dht11Schema);
export default DHT11;