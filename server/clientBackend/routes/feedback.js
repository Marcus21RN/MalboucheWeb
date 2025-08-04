import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const COURIER_API_KEY = "dk_prod_S7VFSY1BDPMRTCK7CEQRK5DPQXT2"; // Usa la misma que en emailReserva.js
const COURIER_TEMPLATE_ID = "E1TET5B3WYMJ25MK9Y82BD1038AB"; // Crea un template específico para feedback

router.post("/send-feedback", async (req, res) => {
  const { name, lastname, email, message, phone, subject } = req.body;

  try {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const time = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const response = await fetch("https://api.courier.com/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COURIER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          to: { email: "0323105965@ut-tijuana.edu.mx" },
          template: COURIER_TEMPLATE_ID,
          data: {
            name,
            lastname,
            email,
            phone,
            subject,
            message,
            date,
            time
          },
          routing: { method: "single", channels: ["email"] },
        },
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Could not send email" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;