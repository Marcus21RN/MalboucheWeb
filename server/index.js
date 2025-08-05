import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Importación de la conexión a la base de datos
import connectDB from './config/db.js';

// RUTAS DE IMPORTACIÓN PARA EL BACKEND DE CLIENTE
import clientBackend from './clientBackend/index.js';

// RUTAS DE IMPORTACIÓN PARA EL BACKEND DE USUARIO
import userBackend from './userBackend/index.js';

// RUTAS DE IMPORTACIÓN PARA EL BACKEND DE ADMINISTRADOR
import adminBackend from './adminBackend/index.js';

// RUTAS DE IMPORTACIÓN PARA EL AUTH JWT
import authJWT from './authJWT/index.js';

// RUTAS DE IMPORTACIÓN PARA LAS LECTURAS DE LOS SENSORES PARA EL BACKEND DE ADMINISTRADOR
import sensoresRoutes from './adminBackend/routes/sensores.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb'}));

// APIs PARA EL BACKEND DE CLIENTE
app.use('/clientBackend', clientBackend);

// APIs PARA EL BACKEND DE USUARIO
app.use('/userBackend', userBackend);

// APIs PARA EL BACKEND DE ADMINISTRADOR
app.use('/adminBackend', adminBackend);

// APIs PARA LOS SENSORES PARA EL BACKEND DE ADMINISTRADOR
app.use('/adminBackend/sensores', sensoresRoutes);

// APIs PARA EL AUTH JWT
app.use('/authJWT', authJWT);

export default app;
