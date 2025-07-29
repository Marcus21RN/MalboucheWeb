import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Modal,
  TextField,
  Grid
} from '@mui/material';
import {
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  MusicNote,
  Restaurant,
  SportsBar,
  Celebration,
  Add as AddIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

// El backend espera que la fecha sea 'fechaEvento', pero el frontend usa 'fecha'.
// Se mapea en fetchEvents y en los handlers de guardado.

const EventsAdmin = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('');
  const [openEventForm, setOpenEventForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);

  // Estado para el formulario
  const [eventFormData, setEventFormData] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    fecha: "",
    horaInicio: "",
    horaFinal: "",
    estado: "pendiente",
    imagen: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adminBackend/events');
      // Mapear fechaEvento a fecha para el frontend
      const mapped = response.data.map(ev => ({
        ...ev,
        fecha: ev.fechaEvento ? new Date(ev.fechaEvento) : '',
      }));
      setEvents(mapped);
      setFilteredEvents(mapped);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
      setFilteredEvents([]);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    setFilteredEvents(
      value ? events.filter((event) => event.estado === value) : events
    );
  };

  // Funciones para el modal
const handleOpenEventForm = (event = null) => {
    if (event) {
      setIsEditMode(true);
      let fechaValue = '';
      if (event.fecha instanceof Date && !isNaN(event.fecha)) {
        fechaValue = event.fecha.toISOString().split('T')[0];
      } else if (typeof event.fecha === 'string' && event.fecha) {
        const d = new Date(event.fecha);
        fechaValue = !isNaN(d) ? d.toISOString().split('T')[0] : '';
      } else if (event.fechaEvento) {
        // fallback por si viene fechaEvento
        const d = new Date(event.fechaEvento);
        fechaValue = !isNaN(d) ? d.toISOString().split('T')[0] : '';
      }
      setEventFormData({
        _id: event._id || '',
        nombre: event.nombre || '',
        descripcion: event.descripcion || '',
        fecha: fechaValue || '',
        horaInicio: event.horaInicio || '',
        horaFinal: event.horaFinal || '',
        estado: event.estado || 'pendiente',
        imagen: event.imagen || ''
      });
      setImagePreview(event.imagen);
      setImageError(false);
    } else {
      setIsEditMode(false);
      setEventFormData({
        _id: '',
        nombre: '',
        descripcion: '',
        fecha: '',
        horaInicio: '',
        horaFinal: '',
        estado: 'pendiente',
        imagen: ''
      });
      setImagePreview('');
      setImageError(false);
    }
    setOpenEventForm(true);
  };

  const handleCloseEventForm = () => {
    setOpenEventForm(false);
    setIsEditMode(false);
    setEventFormData({
      _id: "",
      nombre: "",
      descripcion: "",
      fecha: "",
      horaInicio: "",
      horaFinal: "",
      estado: "pendiente",
      imagen: ""
    });
    setImagePreview('');
    setImageError(false);
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Manejar vista previa de imagen
    if (name === 'imagen') {
      if (value.trim() === '') {
        setImagePreview('');
        setImageError(false);
      } else if (isValidImageUrl(value)) {
        setImagePreview(value);
        setImageError(false);
      } else {
        setImagePreview('');
        setImageError(true);
      }
    }
  };

  const isValidImageUrl = (url) => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
    const urlPattern = /^https?:\/\/.+/;
    return urlPattern.test(url) && (imageExtensions.test(url) || url.includes('unsplash.com') || url.includes('images.'));
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImagePreview('');
  };


  const handleSaveEvent = async () => {
    try {
      let newId = eventFormData._id;
      if (!isEditMode || !newId) {
        // Obtener el número de eventos actuales
        const response = await axios.get('http://localhost:3000/adminBackend/events');
        const count = Array.isArray(response.data) ? response.data.length : 0;
        // Formato: EVENTN
        newId = `EVENT${count+1}`;
      }
      // Construir el payload sin el campo 'fecha', solo 'fechaEvento'
      const { fecha, imagen, ...rest } = eventFormData;
      // Ajustar fecha para evitar desfase por zona horaria
      let fechaEvento = undefined;
      if (fecha) {
        // yyyy-mm-dd a yyyy-mm-ddT00:00:00 (hora local)
        fechaEvento = new Date(fecha + 'T00:00:00');
        // Corregir si sigue habiendo desfase (opcional):
        // fechaEvento = new Date(fechaEvento.getTime() + Math.abs(fechaEvento.getTimezoneOffset())*60000);
      }
      const payload = {
        ...rest,
        _id: newId,
        fechaEvento,
        imagen: typeof imagen === 'string' ? imagen : '',
      };
      if (isEditMode) {
        await axios.put(`http://localhost:3000/adminBackend/events/${eventFormData._id}`, payload);
      } else {
        await axios.post('http://localhost:3000/adminBackend/events', payload);
      }
      await fetchEvents();
      handleCloseEventForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

{/*  const handleCancelEvent = async (id) => {
    try {
      await axios.put(`http://localhost:3000/adminBackend/events/${id}`, { estado: 'cancelado' });
      await fetchEvents();
    } catch (error) {
      console.error('Error canceling event:', error);
    }
  }; */}

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/adminBackend/events/${id}`);
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'cancelado':
        return 'error';
      default:
        return 'default';
    }
  };

  const getEventIcon = (nombre) => {
    const name = nombre.toLowerCase();
    if (name.includes('jazz') || name.includes('concierto') || name.includes('karaoke')) {
      return <MusicNote />;
    } else if (name.includes('degustación') || name.includes('whisky')) {
      return <SportsBar />;
    } else if (name.includes('comida') || name.includes('colombiana')) {
      return <Restaurant />;
    } else {
      return <Celebration />;
    }
  };

  return (
    <Box component={motion.div} 
      sx={{ padding: 3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <EventIcon sx={{ mr: 2, color: '#660152', fontSize: 40 }} />
        <Typography variant="h4" color="#660152" fontWeight="bold">
          Events Management
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
        <Box sx={{  display: 'flex', flexDirection: 'row', gap: 2,  }}>
          <FormControl sx={{ maxWidth: 200, minWidth: 200}}>
            <InputLabel size="small" sx={{ width: 250, backgroundColor: 'white' }} >Filter by status</InputLabel>
            <Select
              labelId="filter-label"
              id="filter"
              value={filter}
              label="Filter by status"
              onChange={handleFilterChange}
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: 1, alignItems: 'center' }}
            >
              <MenuItem value="">All events</MenuItem>
              <MenuItem value="pendiente">Pending</MenuItem>
              <MenuItem value="activo">Active</MenuItem>
              <MenuItem value="cancelado">Canceled</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => handleOpenEventForm()}
            sx={{ 
              backgroundColor: "#660152", 
              '&:hover': { backgroundColor: "#520040" },
              alignSelf: 'flex-start'
            }}
                >
            Crear Evento
          </Button>
        </Box>

        {/* Estadísticas rápidas */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent:"flex-end"}}>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {events.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Events
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {events.filter(e => e.estado === 'activo').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {events.filter(e => e.estado === 'pendiente').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>


      <Card elevation={3}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#660152' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Event</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow 
                    key={event._id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          src={event.imagen} 
                          sx={{ width: 50, height: 50 }}
                        >
                          {getEventIcon(event.nombre)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {event.nombre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.descripcion}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                            ID: {event._id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {new Date(event.fecha).toLocaleDateString('en-GB', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {event.horaInicio}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        until {event.horaFinal}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={event.estado.toUpperCase()} 
                        color={getStatusColor(event.estado)}
                        size="small"
                        sx={{ 
                          fontWeight: 'bold',
                          minWidth: 90,
                          textTransform: 'uppercase',
                          textAlign: 'center',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar evento">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEventForm(event)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip title="Cancelar evento">
                          <span>
                            <IconButton
                              color="warning"
                              onClick={() => handleCancelEvent(event._id)}
                              disabled={event.estado === 'cancelado'}
                              size="small"
                            >
                              <CancelIcon />
                            </IconButton>
                          </span>
                        </Tooltip> */}
                        <Tooltip title="Delete event">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(event._id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredEvents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Box sx={{ py: 6 }}>
                        <EventIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          There were no events found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {filter ? `No events found with status "${filter}"` : 'No events available'}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

{/* Modal para crear/editar eventos */}
<Modal open={openEventForm} onClose={handleCloseEventForm}>
  <Box sx={{ 
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: '90%', md: 700 },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflow: 'auto'
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h6" color="#660152" fontWeight="bold">
        {isEditMode ? "Edit Event" : "Create New Event"}
      </Typography>
      <IconButton onClick={handleCloseEventForm}>
        <CloseIcon />
      </IconButton>
    </Box>

    <Grid container spacing={3}>
      {/* Columna izquierda - Formulario */}
      <Grid item xs={12} md={imagePreview ? 8 : 12}>
        <Grid container spacing={2}>
          {/* Primera fila: Nombre y Fecha */}
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              name="nombre" 
              label="Event Name" 
              value={eventFormData.nombre} 
              onChange={handleEventChange} 
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              name="fecha" 
              label="Event Date" 
              type="date"
              value={eventFormData.fecha} 
              onChange={handleEventChange} 
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Segunda fila: Hora inicio y Hora final */}
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              name="horaInicio" 
              label="Start Time" 
              type="time"
              value={eventFormData.horaInicio} 
              onChange={handleEventChange} 
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              name="horaFinal" 
              label="End Time" 
              type="time"
              value={eventFormData.horaFinal} 
              onChange={handleEventChange} 
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Tercera fila: Estado y URL */}
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              select 
              name="estado" 
              label="Event Status" 
              value={eventFormData.estado} 
              onChange={handleEventChange}
              required
            >
              <MenuItem value="pendiente">Pending</MenuItem>
              <MenuItem value="activo">Active</MenuItem>
              <MenuItem value="cancelado">Cancelled</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              fullWidth 
              name="imagen" 
              label="URL de imagen" 
              value={eventFormData.imagen} 
              onChange={handleEventChange} 
              placeholder="https://ejemplo.com/imagen.jpg"
              error={imageError}
              helperText={imageError ? "Invalid image URL" : "Enter a valid image URL"}
            />
          </Grid>

          {/* Cuarta fila: Descripción (ancho completo) */}
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              name="descripcion" 
              label="Descripción" 
              multiline 
              rows={3} 
              value={eventFormData.descripcion} 
              onChange={handleEventChange} 
              required
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Columna derecha - Vista previa de imagen */}
      {imagePreview && (
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 0 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Preview:
            </Typography>
            <Card elevation={3}>
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={imagePreview}
                  alt="Event preview"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {/* Overlay con información del evento */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white',
                  p: 2
                }}>
                  <Typography variant="h6" fontWeight="bold">
                    {eventFormData.nombre || "Nombre del evento"}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {eventFormData.descripcion ? 
                      (eventFormData.descripcion.length > 60 ? 
                        eventFormData.descripcion.substring(0, 60) + '...' : 
                        eventFormData.descripcion
                      ) : 
                      "Event description"
                    }
                  </Typography>
                  {eventFormData.fecha && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {(() => {
                        // Forzar preview a mostrar la fecha local correcta
                        const fechaStr = eventFormData.fecha;
                        const fechaPreview = new Date(fechaStr + 'T00:00:00');
                        return !isNaN(fechaPreview)
                          ? fechaPreview.toLocaleDateString('en-GB', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : '';
                      })()}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      )}

      {/* Mensaje cuando no hay imagen */}
      {!imagePreview && eventFormData.imagen && (
        <Grid item xs={12}>
          <Box sx={{ 
            p: 3, 
            border: '2px dashed #ccc', 
            borderRadius: 2, 
            textAlign: 'center',
            backgroundColor: '#f9f9f9'
          }}>
            <EventIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">
              {imageError ? 
                "There was an error loading the image. Please check the URL." :
                "Enter a valid URL to see the preview"
              }
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Supported formats: JPG, PNG, GIF, WebP, SVG
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button 
        variant="outlined" 
        onClick={handleCloseEventForm}
      >
        Cancelar
      </Button>
      
      <Button 
        variant="contained" 
        onClick={handleSaveEvent}
        disabled={!eventFormData.nombre || !eventFormData.descripcion || !eventFormData.fecha}
        sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" } }}
      >
        {isEditMode ? 'Update Event' : 'Create Event'}
      </Button>
    </Box>
  </Box>
</Modal>
    </Box>
  );
};

export default EventsAdmin;