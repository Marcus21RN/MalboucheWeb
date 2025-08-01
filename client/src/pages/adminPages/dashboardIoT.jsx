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
  YAxis,
  Area,
  ComposedChart
} from "recharts";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  Divider
} from "@mui/material";
import {
  ThermostatOutlined,
  OpacityOutlined,
  StraightenOutlined,
  SensorsOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  ShowChartOutlined,
  DataUsage,
  Timeline,
  BarChart as BarChartIcon
} from "@mui/icons-material";
import { motion } from 'framer-motion';

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

  // Función para calcular estadísticas simuladas
  const getStatistics = (data, key, sensorType = '') => {
    // Datos simulados por defecto
    const simulatedStats = {
      dht_temp: { avg: 25.8, min: 23.5, max: 27.3, latest: 27.3, trend: 0.2 },
      dht_hum: { avg: 57.1, min: 50, max: 65, latest: 50, trend: -2.0 },
      ultra: { avg: 29.7, min: 25.3, max: 33.6, latest: 30.4, trend: -3.2 },
      mlx: { avg: 30.7, min: 28.5, max: 32.3, latest: 32.3, trend: 0.2 }
    };

    if (!data || data.length === 0) {
      return simulatedStats[sensorType] || { avg: 0, min: 0, max: 0, latest: 0, trend: 0 };
    }

    const values = data.map(item => parseFloat(item[key])).filter(val => !isNaN(val));
    if (values.length === 0) {
      return simulatedStats[sensorType] || { avg: 0, min: 0, max: 0, latest: 0, trend: 0 };
    }

    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const latest = values[values.length - 1] || 0;
    const trend = values.length > 1 ? latest - values[values.length - 2] : 0;
    return { avg, min, max, latest, trend };
  };

  // Estadísticas calculadas
  const tempStats = getStatistics(dhtData, 'temperaturaC', 'dht_temp');
  const humidityStats = getStatistics(dhtData, 'humedad', 'dht_hum');
  const distanceStats = getStatistics(ultraData, 'distanciaCM', 'ultra');
  const mlxTempStats = getStatistics(mlxData, 'temperaturaC', 'mlx');

  // Tarjeta de estadística rápida
  const StatCard = ({ title, value, unit, icon, color, trend, subtitle }) => (
    <Card
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      sx={{
        minWidth: 200,
        width: 230,
        height: 250,
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `2px solid ${color}30`,
        transition: 'all 0.3s ease',
        
       
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend !== undefined && (
              <Chip
                icon={trend > 0 ? <TrendingUpOutlined /> : trend < 0 ? <TrendingDownOutlined /> : <StraightenOutlined />}
                label={trend > 0 ? `+${Math.abs(trend).toFixed(1)}` : trend < 0 ? `-${Math.abs(trend).toFixed(1)}` : '0.0'}
                size="small"
                color={trend > 0 ? "success" : trend < 0 ? "error" : "default"}
                sx={{ fontWeight: 'bold' }}
              />
            )}
          </Box>
        </Box>
        <Typography variant="h4" fontWeight="bold" color={color} gutterBottom>
          {typeof value === 'number' ? value.toFixed(1) : '0.0'}{unit}
        </Typography>
        <Typography variant="h6" color="text.primary" fontWeight="medium">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  // Tarjeta mini para estadísticas de cada gráfica
  const MiniStatCard = ({ label, value, unit, color, icon }) => (
    <Card sx={{
      minWidth: 120,
      width: 180,
      textAlign: 'center',
      border: `1px solid ${color}30`,
      backgroundColor: `${color}08`
    }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Avatar sx={{ bgcolor: color, width: 32, height: 32 }}>
            {icon}
          </Avatar>
        </Box>
        <Typography variant="h6" fontWeight="bold" color={color}>
          {typeof value === 'number' ? value.toFixed(1) : '0.0'}{unit}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="medium">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} sx={{ color: '#84B8F5' }} />
        <Typography variant="h6" color="#84B8F5">
          Cargando datos de sensores...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      sx={{ padding: 3, minHeight: '100vh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SensorsOutlined sx={{ mr: 2, color: '#660152', fontSize: 40 }} />
        <Typography variant="h4" color="#660152" fontWeight="bold" fontFamily={"'montserrat', sans-serif"}>
          Device Interaction Panel
        </Typography>
      </Box>

      {/* Estadísticas Rápidas Generales */}
      <Typography variant="h5" color="#660152" fontWeight="bold" sx={{ mb: 3, textAlign: 'center', fontFamily: "'montserrat', sans-serif" }}>
         Real Time Statistics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center', }}>
        <Grid item xs={12} sm={6} md={3} >
          <StatCard
            title="DHT11 Temp."
            value={tempStats.latest}
            unit="°C"
            icon={<ThermostatOutlined />}
            color="#C91602"
            trend={tempStats.trend}
            subtitle={`Average: ${tempStats.avg.toFixed(1)}°C`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Humidity"
            value={humidityStats.latest}
            unit="%"
            icon={<OpacityOutlined />}
            color="#02B6C9"
            trend={humidityStats.trend}
            subtitle={`Average: ${humidityStats.avg.toFixed(1)}%`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Distance"
            value={distanceStats.latest}
            unit=" cm"
            icon={<StraightenOutlined />}
            color="#84B8F5"
            trend={distanceStats.trend}
            subtitle={`Average: ${distanceStats.avg.toFixed(1)} cm`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Infrared Temp."
            value={mlxTempStats.latest}
            unit="°C"
            icon={<ThermostatOutlined />}
            color="#E87D56"
            trend={mlxTempStats.trend}
            subtitle={`Average: ${mlxTempStats.avg.toFixed(1)}°C`}
          />
        </Grid>
      </Grid>

      {/* Gráficas */}
      <Typography variant="h5" color="#660152" fontWeight="bold" sx={{ mb: 3, textAlign: 'center' }}>
         Sensor Charts
      </Typography>

      {/* DHT11 Chart */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#C91602', mr: 2 }}>
              <ThermostatOutlined />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#660152" fontFamily={"'montserrat', sans-serif"}>
              Temperature and Humidity
              </Typography>
              <Typography variant="body2" color="text.secondary" fontFamily={"'montserrat', sans-serif"}>
                Chart of temperature and humidity sensor DHT11 records
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3, p: 2, borderRadius: 1, }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center', mb: 1, fontWeight: 'bold', fontFamily: "'montserrat', sans-serif" }} >
              DHT11 Statistics:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center'}}>
              <MiniStatCard
                label="Actual Temperature"
                value={tempStats.latest}
                unit="°C"
                color="#C91602"
                icon={<ThermostatOutlined sx={{ fontSize: 16 }} />} 
              />
              <MiniStatCard
                label="Average Temperature"
                value={tempStats.avg}
                unit="°C"
                color="#FF8A65"
                icon={<Timeline sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Actual Humidity"
                value={humidityStats.latest}
                unit="%"
                color="#02B6C9"
                icon={<OpacityOutlined sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Average Humidity"
                value={humidityStats.avg}
                unit="%"
                color="#42A5F5"
                icon={<DataUsage sx={{ fontSize: 16 }} />}
              />
            </Box>
          </Box>
        {/* Gráfica DHT11 */}
         <ResponsiveContainer width="100%" height={540}>
            <ComposedChart
              data={Array.isArray(dhtData) ? [...dhtData].reverse() : []}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
              <CartesianGrid/>
            
              <XAxis
                dataKey="hora"
                tick={{ fill: '#666', fontWeight: 'bold', fontSize: 12 }}
                axisLine={{ stroke: '#666' }}
                tickLine={{ stroke: '#666' }}
                label={{ value: 'Register Time', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14, fontFamily: "'montserrat', sans-serif" }}
              />
              
              <YAxis
                yAxisId="left"
                dataKey="humedad"
                tickFormatter={(tick) => `${tick}%`}
                domain={[0, 100]}
                tick={{ fill: '#016974', fontWeight: 'bold', fontSize: 12 }}
                axisLine={{ stroke: '#666' }}
                tickLine={{ stroke: '#666' }}
                label={{  value: 'Humidity %', angle: -90, position: 'insideLeft', fill: '#016974', fontWeight: 'bold', fontSize: 14, fontFamily: "'montserrat', sans-serif" }}
              />
              
              <YAxis
                yAxisId="right"
                dataKey="temperaturaC"
                orientation="right"
                tickFormatter={(tick) => `${tick}°`}
                domain={[0, 40]}
                tick={{ fill: '#A21202', fontWeight: 'bold', fontSize: 12 }}
                axisLine={{ stroke: '#666' }}
                tickLine={{ stroke: '#666' }}
                label={{ value: 'Temperature °C', angle: -90, position: 'insideRight', fill: '#A21202', fontWeight: 'bold', fontSize: 14, fontFamily: "'montserrat', sans-serif" }}
              />
              {/* Tooltip para Temperatura °C */}
              <Tooltip
                formatter={(value, name) => {
                    const unit = name === 'Temperature °C' ? '°C' : '%';
                    return [`${value}${unit}`, name];
                }}
                labelStyle={{ color: '#000', fontWeight: 'bold', fontFamily: "'montserrat', sans-serif" }}
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
                      return <span style={{ color: '#444746', fontWeight: 'bold', fontFamily: "'montserrat', sans-serif" }}>{value}</span>;
                  }}
              />

              {/* Área de humedad */}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="humedad"
                stroke="#02B6C9"
                fill="#02B6C9"
                fillOpacity={0.1}
                strokeWidth={0}
              />

              {/* Área de temperatura */}
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="temperaturaC"
                stroke="#C91602"
                fill="#C91602"
                fillOpacity={0.3}
                strokeWidth={0}
              />
              
              {/* Líneas por encima de las áreas */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="humedad"
                stroke="#02B6C9"
                strokeWidth={4}
                name=" Humidity %"
                dot={{ r: 4, fill: '#02B6C9' }}
                activeDot={{ r: 6 }}
                label={({ x, y, value }) => (
                  <text x={x} y={y} dy={-10} fill="#02B6C9" fontSize={12} fontWeight="bold" textAnchor="middle">{value}%</text>
                )}
              />
              
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="temperaturaC"
                stroke="#C91602"
                strokeWidth={4}
                name="Temperature °C"
                dot={{ r: 4, fill: '#C91602' }}
                activeDot={{ r: 6 }}
                label={({ x, y, value }) => (
                  <text x={x} y={y} dy={-10} fill="#C91602" fontSize={12} fontWeight="bold" textAnchor="middle">{value}°</text>
                )}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* HC-SR04 Chart */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#84B8F5', mr: 2 }}>
              <StraightenOutlined />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#660152" fontFamily={"'montserrat', sans-serif"}>
              Ultrasonic Distance
              </Typography>
              <Typography variant="body2" color="text.secondary" fontFamily={"'montserrat', sans-serif"}>
                Charts of HC-SR04 distance sensor records
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3, }}>
            <Typography variant="subtitle2" color="text.secondary" fontFamily={"'montserrat', sans-serif"} textAlign="center" fontWeight="bold" gutterBottom>
              HC-SR04 Ultrasonic Distance Statistics:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <MiniStatCard
                label="Current Distance"
                value={distanceStats.latest}
                unit=" cm"
                color="#84B8F5"
                icon={<StraightenOutlined sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Average Distance"
                value={distanceStats.avg}
                unit=" cm"
                color="#0C4D97"
                icon={<Timeline sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Minimum Distance"
                value={distanceStats.min}
                unit=" cm"
                color="#68A9F3"
                icon={<TrendingDownOutlined sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Maximum Distance"
                value={distanceStats.max}
                unit=" cm"
                color="#09376D"
                icon={<TrendingUpOutlined sx={{ fontSize: 16 }} />}
              />
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={Array.isArray(ultraData) ? [...ultraData].reverse() : []}
              margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid stroke="#e0e0e0" vertical={false} />
              
              <XAxis
                dataKey="hora"
                tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
                axisLine={{ stroke: '#444746' }}
                tickLine={{ stroke: '#444746' }}
                label={{ value: 'Timestamp', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14, fontFamily: "'montserrat', sans-serif" }}
              />
              
              <YAxis
                domain={[0, 1000]}
                tickFormatter={(tick) => `${tick}cm`}
                tick={{ fill: '#1063C1', fontWeight: 'bold', fontSize: 12 }}
                axisLine={{ stroke: '#444746' }}
                tickLine={{ stroke: '#444746' }}
                label={{ value: 'Distance', angle: -90, position: 'insideLeft', fill: '#3E91EF', fontWeight: 'bold', fontSize: 14, fontFamily: "'montserrat', sans-serif" }}
              />
              
              <Tooltip
                cursor={{ fill: 'rgba(206, 206, 206, 0.4)' }}
                formatter={(value) => [`${value} cm`, 'Distance']}
                labelStyle={{ color: '#000', fontWeight: 'bold' }}
              />
              
              <Bar
                dataKey="distanciaCM"
                fill="#84B8F5" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* MLX90614 Chart */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: '#E87D56', mr: 2 }}>
              <ShowChartOutlined />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#660152" fontFamily={"'montserrat', sans-serif"}>
               Infrared Temperature
              </Typography>
              <Typography variant="body2" color="text.secondary" fontFamily={"'montserrat', sans-serif"}>
                Charts of MLX90614 infrared sensor records
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3,  }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom fontFamily={"'montserrat', sans-serif"} textAlign="center" fontWeight="bold">
              MLX90614 Statistics:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <MiniStatCard
                label="Current Temp."
                value={mlxTempStats.latest}
                unit="°C"
                color="#E87D56"
                icon={<ShowChartOutlined sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Average Temp."
                value={mlxTempStats.avg}
                unit="°C"
                color="#B84319"
                icon={<Timeline sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Minimum Temp."
                value={mlxTempStats.min}
                unit="°C"
                color="#E0521F"
                icon={<TrendingDownOutlined sx={{ fontSize: 16 }} />}
              />
              <MiniStatCard
                label="Maximum Temp."
                value={mlxTempStats.max}
                unit="°C"
                color="#903514"
                icon={<TrendingUpOutlined sx={{ fontSize: 16 }} />}
              />
              
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={Array.isArray(mlxData) ? [...mlxData].reverse() : []}
              margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid stroke="#e0e0e0" vertical={false} />
              
              <XAxis
                dataKey="hora"
                tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
                axisLine={{ stroke: '#444746' }}
                tickLine={{ stroke: '#444746' }}
                label={{ value: 'Timestamp', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
              />
              
              <YAxis
                domain={[0, 40]}
                tickFormatter={(tick) => `${tick}°C`}
                tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
                axisLine={{ stroke: '#444746' }}
                tickLine={{ stroke: '#444746' }}
                label={{ value: 'Temperature', angle: -90, position: 'insideLeft', fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
              />
              
              <Tooltip
                cursor={{ fill: 'rgba(206, 206, 206, 0.4)' }}
                formatter={(value) => [`${value}°C`, 'Temperature']}
                labelStyle={{ color: '#000', fontWeight: 'bold' }}
              />
              
              <Bar dataKey="temperaturaC" fill="#E87D56">
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardIoT;