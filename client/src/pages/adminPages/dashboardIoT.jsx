import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const DashboardIoT = () => {
  const [dhtData, setDHTData] = useState([]);
  const [ultraData, setUltraData] = useState([]);
  const [mlxData, setMLXData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      axios.get("http://localhost:3000/adminBackend/iot/dht11"),
      axios.get("http://localhost:3000/adminBackend/iot/ultrasonico"),
      axios.get("http://localhost:3000/adminBackend/iot/mlx90615")
    ])
      .then(([dhtRes, ultraRes, mlxRes]) => {
        // Logs para depuración
        console.log("DHT11:", dhtRes.data);
        console.log("Ultrasonico:", ultraRes.data);
        console.log("MLX90615:", mlxRes.data);

        setDHTData(Array.isArray(dhtRes.data) ? dhtRes.data : []);
        setUltraData(Array.isArray(ultraRes.data) ? ultraRes.data : []);
        setMLXData(Array.isArray(mlxRes.data) ? mlxRes.data : []);
      })
      .catch((err) => {
        setError("Error al cargar los datos de los sensores.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 bg-[#F9F4EF] min-h-screen font-sans">
      <h1 className="text-4xl font-serif text-[#4B2E83] mb-8">Panel de Interacción del Dispositivo</h1>

      {loading && <div className="text-center text-[#4B2E83]">Cargando datos...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#4B2E83] mb-4">Temperatura y Humedad Ambiente (DHT11)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={Array.isArray(dhtData) ? [...dhtData].reverse() : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperaturaC" stroke="#4B2E83" name="Temperatura (°C)" />
                <Line type="monotone" dataKey="humedad" stroke="#F2C1E0" name="Humedad (%)" />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#4B2E83] mb-4">Distancia Detectada (HC-SR04)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Array.isArray(ultraData) ? [...ultraData].reverse() : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="distanciaCM" fill="#4B2E83" name="Distancia (cm)" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-[#4B2E83] mb-4">Temperatura Infrarroja (MLX90615)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={Array.isArray(mlxData) ? [...mlxData].reverse() : []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperaturaC" stroke="#F2C1E0" name="Temperatura IR (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </>
      )}

    </div>
  );
};

export default DashboardIoT;