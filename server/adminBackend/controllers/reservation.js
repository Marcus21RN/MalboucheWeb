import Reservation from '../../models/reservation.js';

// Obtener todas las reservaciones con filtros por query (folio, nombre, estado)
export const getReservations = async (req, res) => {
  try {
    const { search, estado } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { _id: { $regex: search, $options: 'i' } },
        { nombreCliente: { $regex: search, $options: 'i' } },
        { primerApell: { $regex: search, $options: 'i' } },
        { segundoApell: { $regex: search, $options: 'i' } },
        { correoCliente: { $regex: search, $options: 'i' } },
        { numTel: { $regex: search, $options: 'i' } }
      ];
    }
    if (estado) {
      filter.estado = estado;
    }

    const reservations = await Reservation.find(filter).sort({ fecha: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations.' });
  }
};

// Cancelar una reservación (cambiar estado a cancelada y guardar motivo)
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo } = req.body;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }
    reservation.estado = 'cancelada';
    if (motivo) reservation.motivoCancel = motivo;
    await reservation.save();
    res.status(200).json({ message: 'Reservation cancelled successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling reservation.' });
  }
};
