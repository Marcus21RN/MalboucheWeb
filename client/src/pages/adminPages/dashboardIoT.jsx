import dayjs from 'dayjs';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
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
  Divider,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  IconButton
} from "@mui/material";
import TextField from '@mui/material/TextField';
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
  BarChart as BarChartIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';



const DashboardIoT = () => {
  const [dhtData, setDHTData] = useState([]);
  const [ultraData, setUltraData] = useState([]);
  const [mlxData, setMLXData] = useState([]);
  const [dhtStats, setDhtStats] = useState(null);
  const [ultraStats, setUltraStats] = useState(null);
  const [mlxStats, setMlxStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filtros históricos
  const [selectedSensor, setSelectedSensor] = useState('dht11');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hourRange, setHourRange] = useState([0, 23]);
  const [quickRange, setQuickRange] = useState('');
  const [historicalData, setHistoricalData] = useState([]);
  const [loadingHistorical, setLoadingHistorical] = useState(false);
  const [historicalError, setHistoricalError] = useState('');
  const chartRef = useRef();

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

  // Consultar histórico según filtros
  const fetchHistorical = async () => {
    setLoadingHistorical(true);
    setHistoricalError('');
    let url = `http://localhost:3000/adminBackend/iot/historico/${selectedSensor}`;
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (hourRange) {
      params.startHour = hourRange[0];
      params.endHour = hourRange[1];
    }
    try {
      const res = await axios.get(url, { params });
      setHistoricalData(Array.isArray(res.data) ? res.data.reverse() : []);
    } catch {
      setHistoricalError('Error al cargar el histórico.');
    } finally {
      setLoadingHistorical(false);
    }
  };

  // Botones rápidos
  const handleQuickRange = (type) => {
    setQuickRange(type);
    const today = dayjs().format('YYYY-MM-DD');
    if (type === 'today') {
      setStartDate(today);
      setEndDate(today);
    } else if (type === 'week') {
      setStartDate(dayjs().subtract(6, 'day').format('YYYY-MM-DD'));
      setEndDate(today);
    } else if (type === 'month') {
      setStartDate(dayjs().subtract(29, 'day').format('YYYY-MM-DD'));
      setEndDate(today);
    }
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setHourRange([0, 23]);
    setQuickRange('');
  };

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

  // Exportar histórico a PDF desde backend
  async function handleExportPDF() {
    if (!historicalData.length) return;
    // Captura la gráfica como imagen base64
    let chartImage = null;
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      chartImage = canvas.toDataURL('image/png');
    }
    // Prepara los datos para el backend (formatea fechas a string legible)
    let rows = [];
    if (selectedSensor === 'dht11') {
      rows = historicalData.map(d => ({
        fecha: d.fecha ? new Date(d.fecha).toLocaleDateString() : '',
        hora: d.hora,
        temperaturaC: d.temperaturaC,
        humedad: d.humedad
      }));
    } else if (selectedSensor === 'ultrasonico') {
      rows = historicalData.map(d => ({
        fecha: d.fecha ? new Date(d.fecha).toLocaleDateString() : '',
        hora: d.hora,
        distanciaCM: d.distanciaCM
      }));
    } else if (selectedSensor === 'mlx90614') {
      rows = historicalData.map(d => ({
        fecha: d.fecha ? new Date(d.fecha).toLocaleDateString() : '',
        hora: d.hora,
        temperaturaC: d.temperaturaC
      }));
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/adminBackend/iot/historico/export/pdf',
        { sensor: selectedSensor, data: rows, chartImage },
        { responseType: 'blob' }
      );
      // Obtener nombre sugerido del header o generar uno
      let filename = response.headers['content-disposition']?.split('filename=')[1]?.replaceAll('"', '') || `historico_${selectedSensor}_${dayjs().format('YYYYMMDD_HHmmss')}.pdf`;
      // Descargar automáticamente
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Error al exportar PDF.');
    }
  }

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
          Loading sensor data...
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
      {/* Panel de filtros históricos con Material UI profesional */}
      <Card 
        elevation={8} 
        sx={{ 
          mb: 4, 
          background: '#fff', 
          borderRadius: 1,
          overflow: 'visible',
          position: 'relative'
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 2, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: '#660152', 
                mr: 2, 
                width: 48, 
                height: 48,
                backdropFilter: 'blur(10px)'
              }}
            >
              <SearchIcon sx={{ color: '#fff', fontSize: 28 }} />
            </Avatar>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#660152', 
                fontWeight: 700, 
                fontFamily: 'Montserrat, sans-serif',
                
              }}
            >
              Historical IoT Sensors Query
            </Typography>
          </Box>

          {/* Sección de selección de sensor, filtros de tiempo y filtros rápidos */}
          <Grid container spacing={3} sx={{ mb: 3, justifyContent: 'center' }}>
            {/* Selección de Sensor */}
            <Grid item xs={12} lg={4}>
              <Card 
                elevation={4} 
                sx={{ 
                  p: 3, 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ color: '#5C6BC0', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                  Select Sensor
                </Typography>
                <ToggleButtonGroup
                  value={selectedSensor}
                  exclusive
                  onChange={(_, v) => v && setSelectedSensor(v)}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    width: '100%',
                    '& .MuiToggleButton-root': {
                      border: '2px solid #5C6BC0',
                      borderRadius: 2,
                      mx: 0.5,
                      flex: 1,
                      '&.Mui-selected': {
                        background: '#5C6BC0',
                        color: '#fff',
                        '&:hover': {
                          background: '#3F51B5'
                        }
                      }
                    }
                  }}
                >
                  <ToggleButton value="dht11" sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <ThermostatOutlined sx={{ fontSize: 28, color: selectedSensor === 'dht11' ? '#fff' : '#5C6BC0' }} />
                    <OpacityOutlined sx={{ fontSize: 20, color: selectedSensor === 'dht11' ? '#fff' : '#42A5F5' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>DHT11</Typography>
                  </ToggleButton>
                  <ToggleButton value="ultrasonico" sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <StraightenOutlined sx={{ fontSize: 28, color: selectedSensor === 'ultrasonico' ? '#fff' : '#9C27B0' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>Ultrasonic</Typography>
                  </ToggleButton>
                  <ToggleButton value="mlx90614" sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <ShowChartOutlined sx={{ fontSize: 28, color: selectedSensor === 'mlx90614' ? '#fff' : '#FF7043' }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>MLX90614</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Card>
            </Grid>

            {/* Filtros de Tiempo */}
            <Grid item xs={12} lg={4}>
              <Card 
                elevation={4} 
                sx={{ 
                  p: 3, 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                  Time Filters
                </Typography>
                <Box>
                  {/* Fechas en una fila */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Start Date"
                        type="date"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#4CAF50' },
                            '&.Mui-focused fieldset': { borderColor: '#4CAF50' }
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="End Date"
                        type="date"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': { borderColor: '#4CAF50' },
                            '&.Mui-focused fieldset': { borderColor: '#4CAF50' }
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  {/* Rango de horas debajo */}
                  <Box sx={{ px: 1 }}>
                    <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600, mb: 1, display: 'block' }}>
                      Hour Range: {hourRange[0]}:00 - {hourRange[1]}:00
                    </Typography>
                    <Slider
                      value={hourRange}
                      onChange={(_, v) => setHourRange(v)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={23}
                      size="small"
                      marks={[
                        { value: 0, label: '0h' }, 
                        { value: 6, label: '6h' }, 
                        { value: 12, label: '12h' }, 
                        { value: 18, label: '18h' }, 
                        { value: 23, label: '23h' }
                      ]}
                      sx={{ 
                        color: '#4CAF50',
                        '& .MuiSlider-thumb': {
                          background: '#4CAF50',
                          border: '2px solid #fff',
                          boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                        },
                        '& .MuiSlider-markLabel': {
                          fontSize: '0.7rem'
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* Filtros Rápidos */}
            <Grid item xs={12} lg={4}>
              <Card 
                elevation={4} 
                sx={{ 
                  p: 3, 
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ color: '#FF9800', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                  Quick Filters
                </Typography>
                <Stack direction="column" spacing={1.5} justifyContent="center">
                  <Button 
                    variant={quickRange === 'today' ? 'contained' : 'outlined'} 
                    onClick={() => handleQuickRange('today')} 
                    fullWidth
                    sx={{ 
                      borderRadius: 2,
                      fontWeight: 600,
                      py: 1.5,
                      color: quickRange === 'today' ? '#fff' : '#FF9800', 
                      borderColor: '#FF9800', 
                      background: quickRange === 'today' ? '#FF9800' : 'transparent',
                      '&:hover': { 
                        background: quickRange === 'today' ? '#F57C00' : 'rgba(255, 152, 0, 0.1)',
                        borderColor: '#FF9800'
                      }
                    }}
                  >
                    Today
                  </Button>
                  <Button 
                    variant={quickRange === 'week' ? 'contained' : 'outlined'} 
                    onClick={() => handleQuickRange('week')} 
                    fullWidth
                    sx={{ 
                      borderRadius: 2,
                      fontWeight: 600,
                      py: 1.5,
                      color: quickRange === 'week' ? '#fff' : '#FF9800', 
                      borderColor: '#FF9800', 
                      background: quickRange === 'week' ? '#FF9800' : 'transparent',
                      '&:hover': { 
                        background: quickRange === 'week' ? '#F57C00' : 'rgba(255, 152, 0, 0.1)',
                        borderColor: '#FF9800'
                      }
                    }}
                  >
                    Last Week
                  </Button>
                  <Button 
                    variant={quickRange === 'month' ? 'contained' : 'outlined'} 
                    onClick={() => handleQuickRange('month')} 
                    fullWidth
                    sx={{ 
                      borderRadius: 2,
                      fontWeight: 600,
                      py: 1.5,
                      color: quickRange === 'month' ? '#fff' : '#FF9800', 
                      borderColor: '#FF9800', 
                      background: quickRange === 'month' ? '#FF9800' : 'transparent',
                      '&:hover': { 
                        background: quickRange === 'month' ? '#F57C00' : 'rgba(255, 152, 0, 0.1)',
                        borderColor: '#FF9800'
                      }
                    }}
                  >
                    Last Month
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>

          {/* Botones de acción */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              onClick={() => { handleClearFilters(); setHistoricalData([]); }}
              variant="outlined"
              size="large"
              sx={{
                minWidth: 150,
                height: 56,
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                borderRadius: 3,
                border: '2px solid #660152',
                color: '#660152',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                '&:hover': { 
                  background: '#F3E5F5', 
                  borderColor: '#660152',
                  
                }
              }}
              startIcon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#660152" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
            >
              Clear Filters
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={fetchHistorical}
              sx={{
                minWidth: 150,
                height: 56,
                fontWeight: 700,
                fontFamily: 'Montserrat, sans-serif',
                borderRadius: 3,
                border: '2px solid #660152',
                 background: 'rgba(255, 255, 255, 0.1)',
                
                color: '#660152',
                textTransform: 'uppercase',
               
                '&:hover': { 
                  background: '#F3E5F5',
                  borderColor: '#660152',
                 
                }
              }}
              startIcon={<SearchIcon sx={{ color: '#660152' }} />}
            >
              Query Data
            </Button>
            <Button
              variant="outlined"
              onClick={handleExportPDF}
              sx={{
                height: 56,
                fontWeight: 'bold',
                fontFamily: 'montserrat',
                border: '2px solid #660152',
                color: '#660152',
                background: '#fff',
                ml: 1,
                '&:hover': { background: '#F3E5F5', borderColor: '#660152' }
              }}
              startIcon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round"/></svg>}
              disabled={!historicalData.length}
            >
              Export PDF
            </Button>
          </Stack>
          {loadingHistorical && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={32} sx={{ color: '#4CAF50' }} />
              <Typography sx={{ ml: 2, color: '#fff' }}>Loading historical data...</Typography>
            </Box>
          )}
          {historicalError && (
            <Alert severity="error" sx={{ mt: 2 }}>{historicalError}</Alert>
          )}
          {/* Gráfica histórica */}
          {historicalData.length > 0 && !loadingHistorical && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" color="#fff" fontWeight="bold" sx={{ mb: 2 }}>
                Historical Data of {selectedSensor === 'dht11' ? 'DHT11' : selectedSensor === 'ultrasonico' ? 'Ultrasonic' : 'MLX90614'}
              </Typography>
              <div ref={chartRef} style={{ background: '#fff', borderRadius: 8, padding: 8 }}>
                <ResponsiveContainer width="100%" height={400}>
                  {selectedSensor === 'dht11' ? (
                    <ComposedChart data={historicalData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                      <CartesianGrid/>
                      <XAxis
                        dataKey="hora"
                        interval={Math.ceil(historicalData.length / 8) - 1}
                        tick={{ fill: '#666', fontWeight: 'bold', fontSize: 12 }}
                        axisLine={{ stroke: '#666' }}
                        tickLine={{ stroke: '#666' }}
                        angle={-35}
                        dy={10}
                        label={{ value: 'Hora', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
                        tickFormatter={h => h.slice(0, 5)}
                      />
                      <YAxis yAxisId="left" dataKey="humedad" tickFormatter={tick => `${tick}%`} domain={[0, 100]} tick={{ fill: '#016974', fontWeight: 'bold', fontSize: 12 }} axisLine={{ stroke: '#666' }} tickLine={{ stroke: '#666' }} label={{ value: 'Humedad %', angle: -90, position: 'insideLeft', fill: '#016974', fontWeight: 'bold', fontSize: 14 }} />
                      <YAxis yAxisId="right" dataKey="temperaturaC" orientation="right" tickFormatter={tick => `${tick}°`} domain={[0, 50]} tick={{ fill: '#A21202', fontWeight: 'bold', fontSize: 12 }} axisLine={{ stroke: '#666' }} tickLine={{ stroke: '#666' }} label={{ value: 'Temp °C', angle: -90, position: 'insideRight', fill: '#A21202', fontWeight: 'bold', fontSize: 14 }} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload || !payload.length) return null;
                          // Filtrar duplicados por dataKey
                          const shown = {};
                          const items = payload.filter(p => {
                            if (p.dataKey === 'humedad' && !shown.humedad) { shown.humedad = true; return true; }
                            if (p.dataKey === 'temperaturaC' && !shown.temperaturaC) { shown.temperaturaC = true; return true; }
                            return false;
                          });
                          // Obtener la fecha del dato (asumiendo que todos los payload tienen la misma fecha)
                          const fecha = payload[0]?.payload?.fecha;
                          return (
                            <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 12, fontFamily: 'montserrat, sans-serif', minWidth: 140 }}>
                              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</div>
                              {fecha && (
                                <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>
                                  {new Date(fecha).toLocaleDateString()}
                                </div>
                              )}
                              {items.map((entry, i) => (
                                <div key={i} style={{ color: entry.dataKey === 'humedad' ? '#02B6C9' : '#C91602', fontWeight: 'bold', marginBottom: 2 }}>
                                  {entry.dataKey === 'humedad' ? 'Humedad %' : 'Temp °C'} : {entry.value}
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      />
                      <Area yAxisId="left" type="monotone" dataKey="humedad" stroke="#02B6C9" fill="#02B6C9" fillOpacity={0.1} strokeWidth={0} legendType="none" />
                      <Area yAxisId="right" type="monotone" dataKey="temperaturaC" stroke="#C91602" fill="#C91602" fillOpacity={0.3} strokeWidth={0} legendType="none" />
                      <Line yAxisId="left" type="monotone" dataKey="humedad" stroke="#02B6C9" strokeWidth={3} name="Humedad %" dot={{ r: 3, fill: '#02B6C9' }} />
                      <Line yAxisId="right" type="monotone" dataKey="temperaturaC" stroke="#C91602" strokeWidth={3} name="Temp °C" dot={{ r: 3, fill: '#C91602' }} />
                    </ComposedChart>
                  ) : selectedSensor === 'ultrasonico' ? (
                    <BarChart data={historicalData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                      <CartesianGrid stroke="#e0e0e0" vertical={false} />
                      <XAxis
                        dataKey="hora"
                        interval={Math.ceil(historicalData.length / 8) - 1}
                        tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
                        axisLine={{ stroke: '#444746' }}
                        tickLine={{ stroke: '#444746' }}
                        angle={-35}
                        dy={10}
                        label={{ value: 'Hora', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
                        tickFormatter={h => h.slice(0, 5)}
                      />
                      <YAxis domain={[0, 1000]} tickFormatter={tick => `${tick}cm`} tick={{ fill: '#1063C1', fontWeight: 'bold', fontSize: 12 }} axisLine={{ stroke: '#444746' }} tickLine={{ stroke: '#444746' }} label={{ value: 'Distancia', angle: -90, position: 'insideLeft', fill: '#3E91EF', fontWeight: 'bold', fontSize: 14 }} />
                      <Tooltip
                      content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload.find(p => p.dataKey === 'distanciaCM');
                      const fecha = payload[0]?.payload?.fecha;
                      return (
                        <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 12, fontFamily: 'montserrat, sans-serif', minWidth: 140 }}>
                        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</div>
                        {fecha && (
                          <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>
                          {new Date(fecha).toLocaleDateString()}
                          </div>
                        )}
                        {item && (
                        <div style={{ color: '#1063C1', fontWeight: 'bold', marginBottom: 2 }}>
                        Distancia (cm): {item.value}
                        </div>
                        )}
                        </div>
                        );
                      }}
                    />
                    <Bar dataKey="distanciaCM" fill="#84B8F5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : (
                  <BarChart data={historicalData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                    <CartesianGrid stroke="#e0e0e0" vertical={false} />
                    <XAxis
                      dataKey="hora"
                      interval={Math.ceil(historicalData.length / 8) - 1}
                      tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }}
                      axisLine={{ stroke: '#444746' }}
                      tickLine={{ stroke: '#444746' }}
                      angle={-35}
                      dy={10}
                      label={{ value: 'Hora', position: 'insideBottom', offset: -15, fill: '#444746', fontWeight: 'bold', fontSize: 14 }}
                      tickFormatter={h => h.slice(0, 5)}
                    />
                    <YAxis domain={[0, 50]} tickFormatter={tick => `${tick}°C`} tick={{ fill: '#444746', fontWeight: 'bold', fontSize: 12 }} axisLine={{ stroke: '#444746' }} tickLine={{ stroke: '#444746' }} label={{ value: 'Temp °C', angle: -90, position: 'insideLeft', fill: '#444746', fontWeight: 'bold', fontSize: 14 }} />
                      <Tooltip
                      content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload.find(p => p.dataKey === 'temperaturaC');
                      const fecha = payload[0]?.payload?.fecha;
                      return (
                        <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 12, fontFamily: 'montserrat, sans-serif', minWidth: 140 }}>
                          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</div>
                          {fecha && (
                          <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>
                          {new Date(fecha).toLocaleDateString()}
                        </div>
                           )}
                         {item && (
                          <div style={{ color: '#E87D56', fontWeight: 'bold', marginBottom: 2 }}>
                          Temperatura °C: {item.value}
                          </div>
                        )}
                        </div>
                        );
                      }}
                      />
                    <Bar dataKey="temperaturaC" fill="#E87D56" />
                  </BarChart>
                )}
                </ResponsiveContainer>
              </div>
            </Box>
          )}
        </CardContent>
      </Card>

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
         Real Time Sensor Charts
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