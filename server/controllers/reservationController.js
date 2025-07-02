import Reservation from '../models/reservation.js';
import { v4 as uuidv4 } from 'uuid';

export const createReservation = async (req, res) => {
  try {
    // Extraer y convertir campos necesarios
    const {
      _id = uuidv4(), // Generar un ID único si no se proporciona
      cantidadPersonas,
      fecha,
      horaInicio,
      horaFinal,
      cliente,
      correoCliente,
      estado,
      numeroMesa
    } = req.body;

    // Crear objeto con conversión de tipos
    const newReservation = new Reservation({
      _id,
      cantidadPersonas: Number(cantidadPersonas),
      fecha: new Date(fecha),
      horaInicio,
      horaFinal,
      cliente,
      correoCliente,
      estado,
      numeroMesa: Number(numeroMesa)
    });

    await newReservation.save();
      console.log('Reserva guardada:', newReservation);
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error al crear la reservación:', error);
    res.status(400).json({ message: error.message });
  }
};


export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

