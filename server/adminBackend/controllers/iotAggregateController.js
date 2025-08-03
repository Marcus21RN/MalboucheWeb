import DHT11 from '../../models/dht11.js';
import Ultrasonico from '../../models/ultrasonico.js';
import MLX90614 from '../../models/mlx90614.js';

// Helper para obtener el último documento
const getLatest = async (Model, sortField) => {
  const latest = await Model.findOne().sort({ fecha: -1, hora: -1 });
  return latest;
};

export const getDHT11Stats = async (req, res) => {
  try {
    const [agg] = await DHT11.aggregate([
      {
        $group: {
          _id: null,
          avgTemp: { $avg: "$temperaturaC" },
          minTemp: { $min: "$temperaturaC" },
          maxTemp: { $max: "$temperaturaC" },
          avgHum: { $avg: "$humedad" },
          minHum: { $min: "$humedad" },
          maxHum: { $max: "$humedad" }
        }
      }
    ]);
    const latest = await getLatest(DHT11, 'fecha');
    res.json({
      temperaturaC: {
        avg: agg?.avgTemp ?? null,
        min: agg?.minTemp ?? null,
        max: agg?.maxTemp ?? null,
        latest: latest?.temperaturaC ?? null
      },
      humedad: {
        avg: agg?.avgHum ?? null,
        min: agg?.minHum ?? null,
        max: agg?.maxHum ?? null,
        latest: latest?.humedad ?? null
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estadísticas DHT11', details: err.message });
  }
};

export const getUltrasonicoStats = async (req, res) => {
  try {
    const [agg] = await Ultrasonico.aggregate([
      {
        $group: {
          _id: null,
          avgDist: { $avg: "$distanciaCM" },
          minDist: { $min: "$distanciaCM" },
          maxDist: { $max: "$distanciaCM" }
        }
      }
    ]);
    const latest = await getLatest(Ultrasonico, 'fecha');
    res.json({
      distanciaCM: {
        avg: agg?.avgDist ?? null,
        min: agg?.minDist ?? null,
        max: agg?.maxDist ?? null,
        latest: latest?.distanciaCM ?? null
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estadísticas Ultrasonico', details: err.message });
  }
};

export const getMLX90614Stats = async (req, res) => {
  try {
    const [agg] = await MLX90614.aggregate([
      {
        $group: {
          _id: null,
          avgTemp: { $avg: "$temperaturaC" },
          minTemp: { $min: "$temperaturaC" },
          maxTemp: { $max: "$temperaturaC" }
        }
      }
    ]);
    const latest = await getLatest(MLX90614, 'fecha');
    res.json({
      temperaturaC: {
        avg: agg?.avgTemp ?? null,
        min: agg?.minTemp ?? null,
        max: agg?.maxTemp ?? null,
        latest: latest?.temperaturaC ?? null
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener estadísticas MLX90614', details: err.message });
  }
};
