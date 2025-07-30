import mongoose from 'mongoose';

// Modelo para iot-mlx90614_Lecturas
const mlx90614Schema = new mongoose.Schema({
  _id: { type: String, required: true },
  temperaturaC: { type: Number, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true }
}, { collection: 'iot-mlx90614_Lecturas' });

const MLX90614 = mongoose.models.MLX90614 || mongoose.model('MLX90614', mlx90614Schema);
export default MLX90614;