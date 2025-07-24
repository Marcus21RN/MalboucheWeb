import mongoose from 'mongoose';

// Modelo para iot-mlx90615_Lecturas
const mlx90615Schema = new mongoose.Schema({
  _id: { type: String, required: true },
  temperaturaC: { type: Number, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true }
}, { collection: 'iot-mlx90615_Lecturas' });

const MLX90615 = mongoose.models.MLX90615 || mongoose.model('MLX90615', mlx90615Schema);
export default MLX90615;