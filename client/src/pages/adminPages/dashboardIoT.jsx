import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
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
      axios.get("http://localhost:3000/adminBackend/iot/mlx90614")
    ])
      .then(([dhtRes, ultraRes, mlxRes]) => {
        // Logs para depuración
        console.log("DHT11:", dhtRes.data);
        console.log("Ultrasonico:", ultraRes.data);
        console.log("MLX90614:", mlxRes.data);

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
    <div className="p-6 bg-white min-h-screen font-sans">
      <h1 className="text-4xl font-serif text-[#4B2E83] mb-8">Panel de Interacción del Dispositivo</h1>

      {loading && <div className="text-center text-[#4B2E83]">Cargando datos...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <>

          {/* Card para una mejor presentación */}
<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
  <section className="mb-12">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-center text-gray-800">DHT11</h2>
      <p className="text-sm text-center text-gray-600">Gráfica de registros del sensor de temperatura y humedad DHT11</p>
    </div>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        // Se mantiene tu lógica original para manejar los datos
        data={Array.isArray(dhtData) ? [...dhtData].reverse() : []}
        margin={{ top: 5, right: 20, left: 10, bottom: 20 }}
      >
        {/* Rejilla con líneas sólidas y color suave */}
        <CartesianGrid stroke="#e0e0e0" strokeDasharray="" />
        
        <XAxis
          dataKey="hora"
          tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
          axisLine={{ stroke: '#444746' }}
          tickLine={{ stroke: '#444746' }}
          label={{ value: 'Hora de registro', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
        />
        
        <YAxis
          yAxisId="left"
          dataKey="humedad"
          tickFormatter={(tick) => `${tick}%`}
          domain={[0, 80]}
          tick={{ fill: '#0B57D0', fontWeight: 'bold', fontSize: 12 }}
          axisLine={{ stroke: '#0B57D0' }}
          tickLine={{ stroke: '#0B57D0' }}
          label={{ value: 'Humedad %', angle: -90, position: 'insideLeft', fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
        />
        
        <YAxis
          yAxisId="right"
          dataKey="temperaturaC"
          orientation="right"
          tickFormatter={(tick) => `${tick}°`}
          domain={[0, 35]}
          tick={{ fill: '#EA6D23', fontWeight: 'bold', fontSize: 12 }}
          axisLine={{ stroke: '#EA6D23' }}
          tickLine={{ stroke: '#EA6D23' }}
          label={{ value: 'Temperatura °C', angle: -90, position: 'insideRight', fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
        />
        
        <Tooltip
          formatter={(value, name) => {
              const unit = name === 'Temperatura °C' ? '°C' : '%';
              return [`${value}${unit}`, name];
          }}
          labelStyle={{ color: '#000', fontWeight: 'bold' }}
          itemStyle={{ fontWeight: 'bold' }}
        />

        <Legend
            verticalAlign="top"
            align="left"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '20px' }}
            formatter={(value, entry) => {
                // eslint-disable-next-line no-unused-vars
                const color = entry.color;
                return <span style={{ color: '#444746', fontWeight: 'bold' }}>{value}</span>;
            }}
        />
        
        <Line
          yAxisId="left"
          type="linear" // Líneas rectas "en punta"
          dataKey="humedad"
          stroke="#0B57D0"
          strokeWidth={2}
          name=" Humedad %"
          dot={{ r: 4, fill: '#0B57D0' }}
          activeDot={{ r: 6 }}
          label={({ x, y, value }) => (
            <text x={x} y={y} dy={-10} fill="#0B57D0" fontSize={12} fontWeight="bold" textAnchor="middle">{value}%</text>
          )}
        />
        
        <Line
          yAxisId="right"
          type="linear" // Líneas rectas "en punta"
          dataKey="temperaturaC"
          stroke="#EA6D23"
          strokeWidth={2}
          name="Temperatura °C"
          dot={{ r: 4, fill: '#EA6D23' }}
          activeDot={{ r: 6 }}
          label={({ x, y, value }) => (
            <text x={x} y={y} dy={-10} fill="#EA6D23" fontSize={12} fontWeight="bold" textAnchor="middle">{value}°</text>
          )}
        />
      </LineChart>
    </ResponsiveContainer>
  </section>
</div>

          {/* Card para una mejor presentación */}
<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
  <section className="mb-12">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-center text-gray-800">HC-SR04</h2>
      <p className="text-sm text-center text-gray-600">Gráfica de registros de sensor de distancia HC-SR04</p>
    </div>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        // Se mantiene tu lógica original para manejar los datos
        data={Array.isArray(ultraData) ? [...ultraData].reverse() : []}
        margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
      >
        {/* Rejilla solo con líneas horizontales, sólidas y de color suave */}
        <CartesianGrid stroke="#e0e0e0" vertical={false} />
        
        <XAxis
          dataKey="hora"
          tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
          axisLine={{ stroke: '#444746' }}
          tickLine={{ stroke: '#444746' }}
          label={{ value: 'Hora de registro', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
        />
        
        <YAxis
          domain={[0, 500]}
          tickFormatter={(tick) => `${tick}cm`}
          tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
          axisLine={{ stroke: '#444746' }}
          tickLine={{ stroke: '#444746' }}
          label={{ value: 'Distancia', angle: -90, position: 'insideLeft', fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
        />
        
        <Tooltip
          cursor={{ fill: 'rgba(206, 206, 206, 0.4)' }}
          formatter={(value) => [`${value} cm`, 'Distancia']}
          labelStyle={{ color: '#000', fontWeight: 'bold' }}
        />
        
        
        <Bar
          dataKey="distanciaCM"
          fill="#6E95C4" 
          radius={[4, 4, 0, 0]} // Bordes superiores redondeados
          position="top"
          fontWeight="bold"
          fontSize={12}
          formatter={(value) => `${value}cm`}
        />
      </BarChart>
    </ResponsiveContainer>
  </section>
</div>

          {/* Card para una mejor presentación */}
<div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
  <section className="mb-12">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-center text-gray-800">MLX90614</h2>
      <p className="text-sm text-center text-gray-600">Gráfica de registros de sensor de infrarrojo mlx90614</p>
    </div>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={Array.isArray(mlxData) ? [...mlxData].reverse() : []}
        margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
      >
        {/* Rejilla solo con líneas horizontales, sólidas y de color suave */}
        <CartesianGrid stroke="#e0e0e0" vertical={false} />
        
        <XAxis
          dataKey="hora"
          tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
          axisLine={{ stroke: '#444746' }}
          tickLine={{ stroke: '#444746' }}
          label={{ value: 'Hora de registro', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
        />
        
        <YAxis
          domain={[0, 35]}
          tickFormatter={(tick) => `${tick}°C`}
          tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
          axisLine={{ stroke: '#444746' }}
          tickLine={{ stroke: '#444746' }}
          label={{ value: 'Temperatura', angle: -90, position: 'insideLeft', fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
        />
        
        <Tooltip
          cursor={{ fill: 'rgba(206, 206, 206, 0.4)' }}
          formatter={(value) => [`${value}°C`, 'Temperatura']}
          labelStyle={{ color: '#000', fontWeight: 'bold' }}
        />
        
        <Bar dataKey="temperaturaC" fill="#FF4500">
          <LabelList
            dataKey="temperaturaC"
            position="top"
            fill="#000000"
            fontWeight="bold"
            fontSize={12}
            formatter={(value) => `${value}°C`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </section>
</div>
        </>
      )}

    </div>
  );
};

export default DashboardIoT;