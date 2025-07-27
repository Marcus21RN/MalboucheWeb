import express from 'express';
const router = express.Router();

import { CourierClient } from "@trycourier/courier";

const courier = new CourierClient({
  authorizationToken: "dk_prod_S7VFSY1BDPMRTCK7CEQRK5DPQXT2",
});

router.post("/", async (req, res) => {
  const { correoCliente, nombreCliente, reservacion } = req.body;
  const folio = reservacion.folio;

  try {
    await courier.send({
      message: {
        to: { email: correoCliente },
        template: "B0FREJ5QM94BRYH4K6TM1BGKJMDQ",  // el ID/nombre de la plantilla que creaste
        data: {  // aquí pasas las variables que usaste en la plantilla
          nombreCliente,
          folio,
          fecha: reservacion.fecha,
          horaInicio: reservacion.horaInicio,
          cantidadPersonas: reservacion.cantidadPersonas,
        },
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    });

    res.status(200).json({ success: true, message: "Correo enviado correctamente." });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ success: false, message: "Error al enviar correo." });
  }
});

export default router;
