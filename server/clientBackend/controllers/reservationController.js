import Reservation from '../../models/reservation.js';

export const createReservation = async (req, res) => {
  try {
    // Crear objeto con los datos validados
    const newReservation = new Reservation({
      _id: req.body._id,
      nombreCliente: req.body.nombreCliente,
      primerApell: req.body.primerApell,
      segundoApell: req.body.segundoApell || ' ',
      correoCliente: req.body.correoCliente,
      numTel: req.body.numTel,
      fecha: req.body.fecha,
      horaInicio: req.body.horaInicio,
      cantidadPersonas: req.body.cantidadPersonas,
      fechaReservacion: req.body.fechaReservacion || new Date(),
      estado: req.body.estado || 'confirmada'
    });

    await newReservation.save();

    res.status(201).json({
      success: true,
      message: 'Reservación creada exitosamente',
      data: newReservation
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Reservation could not be created.'
    });
  }
};
