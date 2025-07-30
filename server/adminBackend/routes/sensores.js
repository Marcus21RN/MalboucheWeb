import express from 'express';
import DHT11 from '../../models/dht11.js';
import MLX90614 from '../../models/mlx90614.js';
import Ultrasonico from '../../models/ultrasonico.js';

const router = express.Router();

// Ruta para guardar lectura del DHT11
router.post('/dht11', async (req, res) => {
    try {
        await DHT11.create(req.body);
        res.status(201).send("Lectura DHT11 guardada");
    } catch (error) {
        res.status(400).send("Error al guardar DHT11: " + error.message);
    }
});

// Ruta para guardar lectura del MLX90614
router.post('/mlx90614', async (req, res) => {
    try {
        await MLX90614.create(req.body);
        res.status(201).send("Lectura MLX90614 guardada");
    } catch (error) {
        res.status(400).send("Error al guardar MLX90614: " + error.message);
    }
});

// Ruta para guardar lectura del HC-SR04
router.post('/ultrasonico', async (req, res) => {
    try {
        await Ultrasonico.create(req.body);
        res.status(201).send("Lectura HC-SR04 guardada");
    } catch (error) {
        res.status(400).send("Error al guardar HC-SR04: " + error.message);
    }
});

export default router;
