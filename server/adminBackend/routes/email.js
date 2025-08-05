import express from "express";
const router = express.Router();
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const COURIER_API_KEY = process.env.COURIER_API_KEY;
const COURIER_TEMPLATE_ID = process.env.COURIER_TEMPLATE_ID;

router.post("/bienvenida-empleado", async (req, res) => {
  const { toEmail, nombre, primerApellido, password, IDRol } = req.body;

  // Traduce el rol a texto legible
  let tipoUsuario = "Employee";
  if (IDRol === "ADMIN") tipoUsuario = "Admin";

  try {
    const response = await fetch("https://api.courier.com/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COURIER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          to: { email: toEmail },
          template: COURIER_TEMPLATE_ID,
          data: {
            nombre,
            primerApellido,
            password,
            tipoUsuario, 
          },
          routing: { method: "single", channels: ["email"] },
        },
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "could not send email" });
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "could not send email" });
  }
});

export default router;