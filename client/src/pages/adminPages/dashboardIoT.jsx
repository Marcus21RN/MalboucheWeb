// DashboardIoT.jsx
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

  useEffect(() => {
    axios.get("/adminBackend/iot/dht11").then((res) => setDHTData(res.data));
    axios.get("/adminBackend/iot/ultrasonico").then((res) => setUltraData(res.data));
    axios.get("/adminBackend/iot/mlx90615").then((res) => setMLXData(res.data));
  }, []);

  return (
    <div className="p-6 bg-[#F9F4EF] min-h-screen font-sans">
      <h1 className="text-4xl font-serif text-[#4B2E83] mb-8">Panel de Interacción del Dispositivo</h1>

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

      <footer className="text-center text-[#4B2E83] mt-12 font-serif">
        &copy; 2025 Wonderland Bar IoT Experience
      </footer>
    </div>
  );
};

export default DashboardIoT;
