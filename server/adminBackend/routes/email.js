import express from "express";
const router = express.Router();
import fetch from "node-fetch";
const COURIER_API_KEY = "dk_prod_S7VFSY1BDPMRTCK7CEQRK5DPQXT2";
const COURIER_TEMPLATE_ID = "DTCVHDPZPSM8CXJKJY1A9QJZ4PS3";

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