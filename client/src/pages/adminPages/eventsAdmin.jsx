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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  MusicNote,
  Restaurant,
  SportsBar,
  CheckCircle,
  Celebration,
  Add as AddIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Image as ImageIcon
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
  const [localImageUrl, setLocalImageUrl] = useState(null);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  // Función para mostrar el snackbar
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

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
    } catch {
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
    if (localImageUrl) {
      URL.revokeObjectURL(localImageUrl);
      setLocalImageUrl(null);
    }
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
        showSnackbar('Event updated successfully', 'success');
      } else {
        await axios.post('http://localhost:3000/adminBackend/events', payload);
        showSnackbar('Event created successfully', 'success');
      }
      await fetchEvents();
      handleCloseEventForm();
    } catch {
      showSnackbar('Error saving event', 'error');
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
            Create New Event
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
                        // Show event status in English: ACTIVE, CANCELED
                        label={
                          event.estado === "activo"
                            ? "ACTIVE"
                            : event.estado === "inactivo"
                            ? "INACTIVE"
                            : event.estado === "cancelado"
                            ? "CANCELED"
                            : "PENDING"
                        }
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
                        <Tooltip title="Edit event">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEventForm(event)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {event.estado === 'activo' ? (
                          <Tooltip title="Cancel event">
                            <IconButton
                              color="error"
                              onClick={async () => {
                                try {
                                  await axios.put(`http://localhost:3000/adminBackend/events/${event._id}`, {
                                    ...event,
                                    estado: 'cancelado'
                                  });
                                  showSnackbar('Event canceled successfully', 'success');
                                  fetchEvents();
                                } catch {
                                  showSnackbar('Failed to cancel event.', 'error');
                                }
                              }}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Activate event">
                            <IconButton
                              sx={{ color: 'green' }}
                              onClick={async () => {
                                try {
                                  await axios.put(`http://localhost:3000/adminBackend/events/${event._id}`, {
                                    ...event,
                                    estado: 'activo'
                                  });
                                  showSnackbar('Event activated successfully', 'success');
                                  fetchEvents();
                                } catch {
                                  showSnackbar('Failed to activate event.', 'error');
                                }
                              }}
                              size="small"
                            >
                              <CheckCircle />
                            </IconButton>
                          </Tooltip>
                        )}
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
          {/* Primera fila: Nombre */}
          <Box sx={{ width: '100%' }}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                name="nombre" 
                label="Event Name"
                placeholder='Event Name'
                value={eventFormData.nombre} 
                onChange={handleEventChange} 
                InputLabelProps={{ shrink: true }}
                required
                />
            </Grid>
          </Box>

          {/* Segunda fila: Fechas */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
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
            </Box>
          </Box>

          {/* Tercera fila: Estado e imagen */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
            <TextField 
              fullWidth 
              select 
              name="estado" 
              label="Status" 
              value={eventFormData.estado} 
              onChange={handleEventChange}
              required
            >
              {!isEditMode && <MenuItem value="pendiente">Pending</MenuItem>}
              <MenuItem value="activo">Active</MenuItem>
              <MenuItem value="cancelado">Cancelled</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<ImageIcon />}
              sx={{ border: '1px solid #c4c4c4', backgroundColor: '#f5f5f5', color: '#660152', '&:hover': { backgroundColor: '#e0e0e0' } }}
            >
              {imagePreview ? 'Change image' : 'Upload image'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  // Preview local instantáneo
                  const localUrl = URL.createObjectURL(file);
                  setLocalImageUrl(localUrl);
                  setImagePreview(localUrl);
                  setImageError(false);
                  // Subida a backend
                  const formData = new FormData();
                  formData.append('file', file);
                  try {
                    const res = await axios.post('http://localhost:3000/adminBackend/upload/image', formData, {
                      headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    setEventFormData(prev => ({ ...prev, imagen: res.data.url }));
                    setImagePreview(res.data.url);
                    if (localImageUrl) {
                      URL.revokeObjectURL(localImageUrl);
                    }
                    setLocalImageUrl(null);
                    setImageError(false);
                    showSnackbar('Image uploaded successfully', 'success');
                  } catch {
                    setImageError(true);
                    if (localImageUrl) {
                      URL.revokeObjectURL(localImageUrl);
                    }
                    setLocalImageUrl(null);
                    showSnackbar('Something went wrong while uploading the image', 'error');
                  }
                }}
              />
            </Button>
            {imageError && (
              <Typography color="error" variant="caption">Something went wrong while uploading the image</Typography>
            )}
            </Box>
          </Box>

          {/* Cuarta fila: Descripción (ancho completo) */}
          <Box sx= {{ width: '100%'}}>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              name="descripcion" 
              label="Description"
              placeholder='Description'
              multiline 
              rows={3} 
              value={eventFormData.descripcion} 
              onChange={handleEventChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Columna derecha - Vista previa de imagen*/}
      {(imagePreview || localImageUrl) && (
                    <Grid item xs={12} md={4}>
                      <Box sx={{ position: 'sticky', top: 0 }}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                          Preview
                        </Typography>
                        <Card elevation={3}>
                          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                            <img
                              src={localImageUrl || imagePreview}
                              alt="Vista previa de promoción"
                              onLoad={handleImageLoad}
                              onError={handleImageError}
                              style={{
                                width: '100%',
                                height: '300px',
                                objectFit: 'cover',
                                display: 'block'
                              }}
                            />
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
                                {eventFormData.nombre || "Event Name"}
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

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
      <Button
        variant="outlined"
        color="error"
        onClick={handleCloseEventForm}
        sx={{ borderRadius: 2, px: 3, fontWeight: 'bold', borderWidth: 2, borderColor: '#b71c1c' }}
        startIcon={<CancelIcon />}
      >
        CANCEL
      </Button>
      <Button
        variant="contained"
        onClick={handleSaveEvent}
        disabled={!eventFormData.nombre || !eventFormData.descripcion || !eventFormData.fecha}
        sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" }, borderRadius: 2, px: 3, fontWeight: 'bold' }}
      >
        {isEditMode ? 'Update Event' : 'Create Event'}
      </Button>
    </Box>
  </Box>
</Modal>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity} 
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default EventsAdmin;