    import express from "express";
    const router = express.Router();
    import fetch from "node-fetch";
    import dotenv from "dotenv";

    dotenv.config();

    const COURIER_API_KEY = process.env.COURIER2_API_KEY;
    const COURIER_TEMPLATE_ID = process.env.COURIER2_TEMPLATE_ID;

    router.post("/cancel-reservation", async (req, res) => {
    const { toEmail, nombreCliente, folio, fecha, horaInicio, cantidadPersonas, motivo } = req.body;

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
                nombreCliente,
                folio,
                fecha,
                horaInicio,
                cantidadPersonas,
                motivo
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