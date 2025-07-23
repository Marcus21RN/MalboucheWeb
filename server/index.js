import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importación de la conexión a la base de datos
import connectDB from './config/db.js';

// RUTAS DE IMPORTACIÓN PARA EL BACKEND DE CLIENTE
import clientBackend from './clientBackend/index.js';

// RUTAS DE IMPORTACIÓN PARA EL BACKEND DE USUARIO
import userBackend from './userBackend/index.js';

// RUTAS DE IMPORTACIÓN PARA EL BACKEND DE ADMINISTRADOR
import adminBackend from './adminBackend/index.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// APIs PARA EL BACKEND DE CLIENTE
app.use('/clientBackend', clientBackend);


// APIs PARA EL BACKEND DE USUARIO
app.use('/userBackend', userBackend);



// APIs PARA EL BACKEND DE ADMINISTRADOR
app.use('/adminBackend', adminBackend);

export default app;
