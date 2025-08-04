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
  const [dhtStats, setDhtStats] = useState(null);
  const [ultraStats, setUltraStats] = useState(null);
  const [mlxStats, setMlxStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      axios.get("http://localhost:3000/adminBackend/iot/dht11"),
      axios.get("http://localhost:3000/adminBackend/iot/ultrasonico"),
      axios.get("http://localhost:3000/adminBackend/iot/mlx90614"),
      axios.get("http://localhost:3000/adminBackend/iot/aggregate/dht11"),
      axios.get("http://localhost:3000/adminBackend/iot/aggregate/ultrasonico"),
      axios.get("http://localhost:3000/adminBackend/iot/aggregate/mlx90614")
    ])
      .then(([dhtRes, ultraRes, mlxRes, dhtStatsRes, ultraStatsRes, mlxStatsRes]) => {
        setDHTData(Array.isArray(dhtRes.data) ? dhtRes.data : []);
        setUltraData(Array.isArray(ultraRes.data) ? ultraRes.data : []);
        setMLXData(Array.isArray(mlxRes.data) ? mlxRes.data : []);
        setDhtStats(dhtStatsRes.data);
        setUltraStats(ultraStatsRes.data);
        setMlxStats(mlxStatsRes.data);
      })
      .catch((err) => {
        setError("Error al cargar los datos de los sensores.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Estadísticas calculadas desde el backend
  const tempStats = dhtStats ? {
    avg: dhtStats.temperaturaC.avg,
    min: dhtStats.temperaturaC.min,
    max: dhtStats.temperaturaC.max,
    latest: dhtStats.temperaturaC.latest,
    // trend: null
  } : { avg: 0, min: 0, max: 0, latest: 0, trend: null };

  const humidityStats = dhtStats ? {
    avg: dhtStats.humedad.avg,
    min: dhtStats.humedad.min,
    max: dhtStats.humedad.max,
    latest: dhtStats.humedad.latest,
    // trend: null
  } : { avg: 0, min: 0, max: 0, latest: 0, trend: null };

  const distanceStats = ultraStats ? {
    avg: ultraStats.distanciaCM.avg,
    min: ultraStats.distanciaCM.min,
    max: ultraStats.distanciaCM.max,
    latest: ultraStats.distanciaCM.latest,
  //  trend: null
  } : { avg: 0, min: 0, max: 0, latest: 0, trend: null };

  const mlxTempStats = mlxStats ? {
    avg: mlxStats.temperaturaC.avg,
    min: mlxStats.temperaturaC.min,
    max: mlxStats.temperaturaC.max,
    latest: mlxStats.temperaturaC.latest,
  //  trend: null
  } : { avg: 0, min: 0, max: 0, latest: 0, trend: null };

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
            {(() => {
              const data = Array.isArray(dhtData) ? [...dhtData].reverse() : [];
              const maxHumidity = data.length > 0 ? Math.max(...data.map(d => d.humedad || 0)) : 100;
              const maxTemp = data.length > 0 ? Math.max(...data.map(d => d.temperaturaC || 0)) : 40;
              return (
                <ComposedChart
                  data={data}
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
                    domain={[0, maxHumidity + 5]}
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
                    domain={[0, maxTemp + 2]}
                    tick={{ fill: '#A21202', fontWeight: 'bold', fontSize: 12 }}
                    axisLine={{ stroke: '#666' }}
                    tickLine={{ stroke: '#666' }}
                    label={{ value: 'Temperature °C', angle: -90, position: 'insideRight', fill: '#A21202', fontWeight: 'bold', fontSize: 14, fontFamily: "'montserrat', sans-serif" }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      // Buscar los valores de las líneas (no de las áreas)
                      const humidity = payload.find(p => p.dataKey === 'humedad' && p.name === 'Humidity %');
                      const temp = payload.find(p => p.dataKey === 'temperaturaC' && p.name === 'Temperature °C');
                      return (
                        <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 12, fontFamily: 'montserrat, sans-serif', minWidth: 120 }}>
                          <div style={{ fontWeight: 'bold', marginBottom: 6 }}>{label}</div>
                          {humidity && (
                            <div style={{ color: '#02B6C9', fontWeight: 'bold', marginBottom: 2 }}>
                              Humidity % : {humidity.value}%
                            </div>
                          )}
                          {temp && (
                            <div style={{ color: '#C91602', fontWeight: 'bold' }}>
                              Temperature °C : {temp.value}°C
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="left"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '20px' }}
                    payload={[
                      { value: 'Humidity %', type: 'line', id: 'humedad', color: '#02B6C9' },
                      { value: 'Temperature °C', type: 'line', id: 'temperaturaC', color: '#C91602' }
                    ]}
                    // eslint-disable-next-line no-unused-vars
                    formatter={(value, entry) => (
                      <span style={{ color: '#444746', fontWeight: 'bold', fontFamily: "'montserrat', sans-serif" }}>{value}</span>
                    )}
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
                    legendType="none"
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
                    legendType="none"
                  />
                  {/* Líneas por encima de las áreas */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="humedad"
                    stroke="#02B6C9"
                    strokeWidth={4}
                    name="Humidity %"
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
              );
            })()}
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
            {(() => {
              const data = Array.isArray(ultraData) ? [...ultraData].reverse() : [];
              const max = data.length > 0 ? Math.max(...data.map(d => d.distanciaCM || 0)) : 1000;
              return (
                <BarChart
                  data={data}
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
                    domain={[0, max + 20]}
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
              );
            })()}
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