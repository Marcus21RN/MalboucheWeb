// Validación de límite de personas reservadas por día (máximo 20)
export const checkPeopleLimitPerDay = async (req, res, next) => {
  try {
    const { fecha, cantidadPersonas } = req.body;
    if (!fecha || !cantidadPersonas) return next(); // Si falta info, dejar que otra validación lo rechace

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
          message: `Solo hay ${disponibles} espacio(s) disponible(s) para reservar ese día.`
        });
      } else {
        return res.status(409).json({
          success: false,
          message: 'No hay espacios disponibles para reservar ese día.'
        });
      }
    }
    next();
  } catch (error) {
    console.error('Error al validar límite de personas por día:', error);
    res.status(500).json({
      success: false,
      message: 'Error al validar disponibilidad de personas para la fecha.'
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
        message: 'No se pueden hacer reservaciones para fechas/horas pasadas'
      });
    }
    // Validar anticipación mínima (2 horas)
    const minReservationTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    if (reservationDateTime < minReservationTime) {
      return res.status(400).json({
        success: false,
        message: 'Las reservaciones requieren al menos 2 horas de anticipación. Por favor selecciona un horario posterior.'
      });
    }
    // Validar horario de atención (3:00 PM a 12:00 AM)
    const [hours] = horaInicio.split(':').map(Number);
    if (hours < 15 || hours >= 24) {
      return res.status(400).json({
        success: false,
        message: 'Nuestro horario de atención es de 3:00 PM a 12:00 AM. Por favor selecciona un horario dentro de este rango.'
      });
    }
    next();
  } catch (error) {
    console.error('Error en validación de horario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al validar el horario de reservación'
    });
  }
};
