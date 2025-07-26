import Reservation from '../../models/reservation.js';

// Validaciones básicas de los datos de entrada
export const validateReservationData = (req, res, next) => {
  const {
    nombreCliente,
    primerApell,
    numTel,
    fecha,
    horaInicio,
    cantidadPersonas
  } = req.body;

  // Validar campos requeridos
  if (!nombreCliente || !primerApell || !numTel || !fecha || !horaInicio || !cantidadPersonas) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos: nombre, apellido, teléfono, fecha, hora y cantidad de personas'
    });
  }

  // Validar formato del teléfono
  if (!/^\d{10}$/.test(numTel.toString())) {
    return res.status(400).json({
      success: false,
      message: 'El número de teléfono debe tener exactamente 10 dígitos numéricos'
    });
  }

  // Validar cantidad de personas (1-4)
  if (cantidadPersonas < 1 || cantidadPersonas > 4) {
    return res.status(400).json({
      success: false,
      message: 'La reservación debe ser para entre 1 y 4 personas'
    });
  }

  // Validar formato de fecha
  if (isNaN(Date.parse(fecha))) {
    return res.status(400).json({
      success: false,
      message: 'La fecha proporcionada no tiene un formato válido'
    });
  }

  // Validar formato de hora (HH:MM)
  if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horaInicio)) {
    return res.status(400).json({
      success: false,
      message: 'El horario debe estar en formato HH:MM (24 horas)'
    });
  }

  next();
};

// Validación de disponibilidad (límite de reservaciones por día)
export const checkReservationAvailability = async (req, res, next) => {
  try {
    const { fecha } = req.body;
    const MAX_RESERVATIONS_PER_DAY = 10;

    const reservationsCount = await Reservation.countDocuments({
      fecha: fecha,
      estado: 'confirmada'
    });

    if (reservationsCount >= MAX_RESERVATIONS_PER_DAY) {
      return res.status(409).json({
        success: false,
        message: 'Lo sentimos, no hay disponibilidad para la fecha seleccionada. Por favor elige otra fecha.'
      });
    }

    next();
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al verificar la disponibilidad'
    });
  }
};

// Validación de horario de reservación
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
