// Validación de límite de personas reservadas por día (máximo 20)
export const checkPeopleLimitPerDay = async (req, res, next) => {
  try {
    const { fecha, cantidadPersonas } = req.body;
    if (!fecha || !cantidadPersonas) return next();

    // Buscar todas las reservaciones confirmadas para la fecha
    const start = new Date(fecha);
    start.setHours(0,0,0,0);
    const end = new Date(fecha);
    end.setHours(23,59,59,999);

    const reservas = await Reservation.find({
      fecha: { $gte: start, $lte: end },
      estado: 'confirmada'
    });
    const totalPersonas = reservas.reduce((acc, r) => acc + (r.cantidadPersonas || 0), 0);
    const personasSolicitadas = Number(cantidadPersonas);
    const LIMITE = 20;

    if (totalPersonas + personasSolicitadas > LIMITE) {
      const disponibles = LIMITE - totalPersonas;
      if (disponibles > 0) {
        return res.status(409).json({
          success: false,
          message: `Just ${disponibles} space(s) available to reserve that day.`
        });
      } else {
        return res.status(409).json({
          success: false,
          message: 'No spaces available to reserve that day.'
        });
      }
    }
    next();
  } catch (error) {
    console.error('Error validating daily people limit:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating availability of people for the date.'
    });
  }
};

import Reservation from '../../models/reservation.js';


export const validateReservationTime = (req, res, next) => {
  try {
    const { fecha, horaInicio } = req.body;
    // Crear objeto Date combinando fecha y hora
    const reservationDateTime = new Date(`${fecha}T${horaInicio}`);
    const now = new Date();
    // Validar que no sea en el pasado
    if (reservationDateTime < now) {
      return res.status(400).json({
        success: false,
        message: 'Cannot create reservation in the past.'
      });
    }
    // Validar anticipación mínima (2 horas)
    const minReservationTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    if (reservationDateTime < minReservationTime) {
      return res.status(400).json({
        success: false,
        message: 'Reservations require at least 2 hours of notice. Please select a later time.'
      });
    }
    // Validar horario de atención (3:00 PM a 12:00 AM)
    const [hours] = horaInicio.split(':').map(Number);
    if (hours < 15 || hours >= 24) {
      return res.status(400).json({
        success: false,
        message: 'Our business hours are from 3:00 PM to 12:00 AM. Please select a time within this range.'
      });
    }
    next();
  } catch (error) {
    console.error('Error validating time:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating reservation time'
    });
  }
};
