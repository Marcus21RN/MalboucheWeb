import DHT11 from '../../models/dht11.js';
import Ultrasonico from "../../models/ultrasonico.js";
import MLX90615 from "../../models/mlx90615.js";

export const obtenerLecturasDHT11 = async (req, res) => {
  try {
    const lecturas = await DHT11.find({}).sort({ hora: -1 }).limit(10);
    res.json(lecturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lecturas DHT11" });
  }
};

export const obtenerLecturasUltrasonico = async (req, res) => {
  try {
    const lecturas = await Ultrasonico.find({}).sort({ hora: -1 }).limit(10);
    res.json(lecturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lecturas del sensor ultrasónico" });
  }
};

export const obtenerLecturasMLX90615 = async (req, res) => {
  try {
    const lecturas = await MLX90615.find({}).sort({ hora: -1 }).limit(10);
    res.json(lecturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lecturas MLX90615" });
  }
};

export default {
  obtenerLecturasDHT11,
  obtenerLecturasUltrasonico,
  obtenerLecturasMLX90615
};