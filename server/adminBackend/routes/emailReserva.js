    import express from "express";
    const router = express.Router();
    import fetch from "node-fetch";
    const COURIER_API_KEY = "dk_prod_S7VFSY1BDPMRTCK7CEQRK5DPQXT2";
    const COURIER_TEMPLATE_ID = "XJ83SMFN1P49TNJH6AJVMMAJKQ54"; 

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