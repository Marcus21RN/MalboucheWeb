import Reservation from '../../models/reservation.js';

// Filtro por día de la semana usando aggregate
export const filterByWeekday = async (req, res) => {
  try {
    const { weekday } = req.query;
    if (weekday === undefined) {
      return res.status(400).json({ message: 'Weekday is required (0=Sunday, 1=Monday, ... 6=Saturday).' });
    }
    const result = await Reservation.aggregate([
      {
        $addFields: {
          dayOfWeek: {
            $dayOfWeek: {
              date: "$fecha",
              timezone: "America/Mexico_City"
            }
          }
        }
      },
      {
        $match: {
          dayOfWeek: Number(weekday) + 1
        }
      },
      { $sort: { fecha: 1 } }
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering by weekday.' });
  }
};
