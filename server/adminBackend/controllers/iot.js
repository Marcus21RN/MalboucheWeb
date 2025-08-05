import DHT11 from '../../models/dht11.js';
import MLX90614 from "../../models/mlx90614.js";
import Ultrasonico from "../../models/ultrasonico.js";

export const obtenerLecturasDHT11 = async (req, res) => {
  try {
    const lecturas = await DHT11.find({}).sort({ hora: -1 }).limit(10);
    res.json(lecturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lecturas DHT11" });
  }
};

// Histórico filtrable por fecha/hora para DHT11
export const obtenerHistoricoDHT11 = async (req, res) => {
  try {
    const { startDate, endDate, startHour, endHour } = req.query;
    let filter = {};
    if (startDate || endDate) {
      filter.fecha = {};
      if (startDate) filter.fecha.$gte = new Date(startDate);
      if (endDate) filter.fecha.$lte = new Date(endDate);
    }
    const lecturas = await DHT11.find(filter).sort({ fecha: -1 });
    // Filtrado por hora (string tipo 'HH:mm:ss')
    let result = lecturas;
    if (startHour || endHour) {
      result = lecturas.filter(l => {
        const h = parseInt(l.hora.split(':')[0], 10);
        let ok = true;
        if (startHour !== undefined) ok = ok && h >= parseInt(startHour);
        if (endHour !== undefined) ok = ok && h <= parseInt(endHour);
        return ok;
      });
    }
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener histórico DHT11" });
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

// Histórico filtrable por fecha/hora para Ultrasonico
export const obtenerHistoricoUltrasonico = async (req, res) => {
  try {
    const { startDate, endDate, startHour, endHour } = req.query;
    let filter = {};
    if (startDate || endDate) {
      filter.fecha = {};
      if (startDate) filter.fecha.$gte = new Date(startDate);
      if (endDate) filter.fecha.$lte = new Date(endDate);
    }
    const lecturas = await Ultrasonico.find(filter).sort({ fecha: -1 });
    let result = lecturas;
    if (startHour || endHour) {
      result = lecturas.filter(l => {
        const h = parseInt(l.hora.split(':')[0], 10);
        let ok = true;
        if (startHour !== undefined) ok = ok && h >= parseInt(startHour);
        if (endHour !== undefined) ok = ok && h <= parseInt(endHour);
        return ok;
      });
    }
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener histórico Ultrasonico" });
  }
};

export const obtenerLecturasMLX90614 = async (req, res) => {
  try {
    const lecturas = await MLX90614.find({}).sort({ hora: -1 }).limit(10);
    res.json(lecturas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lecturas MLX90614" });
  }
};

// Histórico filtrable por fecha/hora para MLX90614
export const obtenerHistoricoMLX90614 = async (req, res) => {
  try {
    const { startDate, endDate, startHour, endHour } = req.query;
    let filter = {};
    if (startDate || endDate) {
      filter.fecha = {};
      if (startDate) filter.fecha.$gte = new Date(startDate);
      if (endDate) filter.fecha.$lte = new Date(endDate);
    }
    const lecturas = await MLX90614.find(filter).sort({ fecha: -1 });
    let result = lecturas;
    if (startHour || endHour) {
      result = lecturas.filter(l => {
        const h = parseInt(l.hora.split(':')[0], 10);
        let ok = true;
        if (startHour !== undefined) ok = ok && h >= parseInt(startHour);
        if (endHour !== undefined) ok = ok && h <= parseInt(endHour);
        return ok;
      });
    }
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener histórico MLX90614" });
  }
};

export default {
  obtenerLecturasDHT11,
  obtenerLecturasUltrasonico,
  obtenerLecturasMLX90614
  ,obtenerHistoricoDHT11
  ,obtenerHistoricoUltrasonico
  ,obtenerHistoricoMLX90614
};