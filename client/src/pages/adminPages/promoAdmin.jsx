import React, { useState, useEffect } from "react";
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
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
  LocalOffer as PromoIcon,
  Image as ImageIcon
} from "@mui/icons-material";
import { motion } from 'framer-motion';

// Datos simulados basados en el ejemplo proporcionado
const mockPromos = [
  {
    _id: "PROMO001",
    nombre: "Martes Cervezas a Mitad de Precio",
    descripcion: "Todas las cervezas nacionales e importadas a 50% de descuento cada martes.",
    fechaInicio: "2025-07-01",
    fechaFin: "2025-12-31",
    estado: "activo",
    imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400"
  },
  {
    _id: "PROMO002",
    nombre: "Cumpleañeros Entran Gratis",
    descripcion: "Si es tu cumpleaños, la entrada es gratis todo el día.",
    fechaInicio: "2025-01-01",
    fechaFin: "2026-01-01",
    estado: "activo",
    imagen: null
  },
  {
    _id: "PROMO003",
    nombre: "Happy Hour Cocktails",
    descripcion: "2x1 en todos los cocktails de lunes a viernes de 6PM a 8PM.",
    fechaInicio: "2025-06-01",
    fechaFin: "2025-08-31",
    estado: "activo",
    imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"
  },
  {
    _id: "PROMO004",
    nombre: "Descuento Estudiantes",
    descripcion: "20% de descuento para estudiantes con credencial vigente.",
    fechaInicio: "2025-03-01",
    fechaFin: "2025-05-31",
    estado: "inactivo",
    imagen: null
  }
];

const PromoAdmin = () => {
  const [promos, setPromos] = useState(mockPromos);
  const [filteredPromos, setFilteredPromos] = useState(mockPromos);
  const [filter, setFilter] = useState('');
  const [openPromoForm, setOpenPromoForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(false);

  // Estado para el formulario
  const [promoFormData, setPromoFormData] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "activo",
    imagen: ""
  });

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      // const res = await fetch("http://localhost:3000/adminBackend/promos");
      // const data = await res.json();
      // setPromos(data);
      // setFilteredPromos(data);
      
      // Usar datos simulados
      setPromos(mockPromos);
      setFilteredPromos(mockPromos);
    } catch (error) {
      console.error('Error fetching promos:', error);
      setPromos(mockPromos);
      setFilteredPromos(mockPromos);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    setFilteredPromos(
      value ? promos.filter((promo) => promo.estado === value) : promos
    );
  };

  // Funciones para el modal
  const handleOpenPromoForm = (promo = null) => {
    if (promo) {
      setIsEditMode(true);
      setPromoFormData({
        _id: promo._id,
        nombre: promo.nombre,
        descripcion: promo.descripcion,
        fechaInicio: promo.fechaInicio,
        fechaFin: promo.fechaFin,
        estado: promo.estado,
        imagen: promo.imagen || ""
      });
      setImagePreview(promo.imagen);
    } else {
      setIsEditMode(false);
      setPromoFormData({
        _id: "",
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "activo",
        imagen: ""
      });
      setImagePreview(null);
    }
    setImageError(false);
    setOpenPromoForm(true);
  };

  const handleClosePromoForm = () => {
    setOpenPromoForm(false);
    setIsEditMode(false);
    setImagePreview(null);
    setImageError(false);
    setPromoFormData({
      _id: "",
      nombre: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: "",
      estado: "activo",
      imagen: ""
    });
  };

  const handlePromoChange = (e) => {
    const { name, value } = e.target;
    setPromoFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Manejar preview de imagen
    if (name === 'imagen') {
      if (value) {
        setImagePreview(value);
        setImageError(false);
      } else {
        setImagePreview(null);
        setImageError(false);
      }
    }
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImagePreview(null);
  };

  const handleSavePromo = async () => {
    try {
      if (isEditMode) {
        // Actualizar promo existente
        const updatedPromos = promos.map(promo => 
          promo._id === promoFormData._id ? promoFormData : promo
        );
        setPromos(updatedPromos);
        setFilteredPromos(
          filter ? updatedPromos.filter(promo => promo.estado === filter) : updatedPromos
        );
      } else {
        // Crear nueva promo
        const newPromo = {
          ...promoFormData,
          _id: `PROMO${String(promos.length + 1).padStart(3, '0')}`
        };
        const updatedPromos = [...promos, newPromo];
        setPromos(updatedPromos);
        setFilteredPromos(
          filter ? updatedPromos.filter(promo => promo.estado === filter) : updatedPromos
        );
      }
      
      showSnackbar(
        isEditMode ? "Promoción actualizada exitosamente" : "Promoción creada exitosamente",
        "success"
      );
      handleClosePromoForm();
    } catch (error) {
      console.error('Error saving promo:', error);
      showSnackbar("Error al guardar promoción", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      // await fetch(`http://localhost:3000/adminBackend/promos/${id}`, { method: "DELETE" });
      
      // Simular eliminación local
      const updatedPromos = promos.filter(promo => promo._id !== id);
      setPromos(updatedPromos);
      setFilteredPromos(
        filter ? updatedPromos.filter(promo => promo.estado === filter) : updatedPromos
      );
      
      showSnackbar("Promoción eliminada exitosamente", "success");
    } catch (error) {
      console.error('Error deleting promo:', error);
      showSnackbar("Error al eliminar promoción", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'activo':
        return 'success';
      case 'inactivo':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPromoIcon = (nombre) => {
    const firstLetter = nombre ? nombre.charAt(0).toUpperCase() : 'P';
    return firstLetter;
  };

  const isPromoActive = (fechaInicio, fechaFin) => {
    const now = new Date();
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return now >= inicio && now <= fin;
  };

  return (
    <Box component={motion.div} 
      sx={{ padding: 3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <PromoIcon sx={{ mr: 2, color: '#660152', fontSize: 40 }} />
            <Typography variant="h4" color="#660152" fontWeight="bold">
            Gestión de Promociones
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{  display: 'flex', flexDirection: 'row', gap: 2,  }}>

                <FormControl size="small" sx={{ width: 250, backgroundColor: 'white' }}>
                    <InputLabel id="filter-label">Filtrar por estado</InputLabel>
                        <Select
                            labelId="filter-label"
                            id="filter"
                            value={filter}
                            label="Filtrar por estado"
                            onChange={handleFilterChange}
                            size="small"
                        >
                            <MenuItem value="">Todas las promociones</MenuItem>
                            <MenuItem value="activo">Activas</MenuItem>
                            <MenuItem value="inactivo">Inactivas</MenuItem>
                        </Select>
                </FormControl>

                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenPromoForm()}
                    sx={{ 
                        backgroundColor: "#660152", 
                        '&:hover': { backgroundColor: "#520040" },
                        alignSelf: 'flex-start'
                    }}
                    >
                    Crear Promoción
                </Button>  
            </Box>

      {/* Estadísticas rápidas */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: "flex-end" }}>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {promos.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Promociones
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {promos.filter(p => p.estado === 'activo').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Activas
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              {promos.filter(p => p.estado === 'inactivo').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inactivas
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {promos.filter(p => isPromoActive(p.fechaInicio, p.fechaFin)).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vigentes
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
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Promoción</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Vigencia</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPromos.map((promo) => (
                  <TableRow 
                    key={promo._id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          src={promo.imagen} 
                          sx={{ 
                            width: 50, 
                            height: 50,
                            backgroundColor: '#660152'
                          }}
                        >
                          {promo.imagen ? null : getPromoIcon(promo.nombre)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {promo.nombre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {promo.descripcion}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                            ID: {promo._id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {new Date(promo.fechaInicio).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        hasta {new Date(promo.fechaFin).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short', 
                          year: 'numeric'
                        })}
                      </Typography>
                      {isPromoActive(promo.fechaInicio, promo.fechaFin) && (
                        <Chip 
                          label="VIGENTE" 
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ mt: 0.5, fontSize: '0.7rem' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={promo.estado.toUpperCase()} 
                        color={getStatusColor(promo.estado)}
                        size="small"
                        sx={{ 
                          fontWeight: 'bold',
                          minWidth: 80,
                          textTransform: 'uppercase'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar promoción">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenPromoForm(promo)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar promoción">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(promo._id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPromos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Box sx={{ py: 6 }}>
                        <PromoIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          No se encontraron promociones
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {filter ? `No hay promociones con estado "${filter}"` : 'No hay promociones disponibles'}
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

      {/* Modal para crear/editar promociones */}
      <Modal open={openPromoForm} onClose={handleClosePromoForm}>
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
              {isEditMode ? "Editar Promoción" : "Crear Nueva Promoción"}
            </Typography>
            <IconButton onClick={handleClosePromoForm}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            {/* Columna izquierda - Formulario */}
            <Grid item xs={12} md={imagePreview ? 8 : 12}>
              <Grid container spacing={2}>
                {/* Primera fila: ID y Nombre */}
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    name="_id" 
                    label="ID de promoción" 
                    value={promoFormData._id} 
                    onChange={handlePromoChange} 
                    required
                    disabled={isEditMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    name="nombre" 
                    label="Nombre de promoción" 
                    value={promoFormData.nombre} 
                    onChange={handlePromoChange} 
                    required
                  />
                </Grid>

                {/* Segunda fila: Fechas */}
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    name="fechaInicio" 
                    label="Fecha de inicio" 
                    type="date"
                    value={promoFormData.fechaInicio} 
                    onChange={handlePromoChange} 
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    name="fechaFin" 
                    label="Fecha de fin" 
                    type="date"
                    value={promoFormData.fechaFin} 
                    onChange={handlePromoChange} 
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                {/* Tercera fila: Estado y URL de imagen */}
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    select 
                    name="estado" 
                    label="Estado" 
                    value={promoFormData.estado} 
                    onChange={handlePromoChange}
                    required
                  >
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth 
                    name="imagen" 
                    label="URL de imagen" 
                    value={promoFormData.imagen} 
                    onChange={handlePromoChange} 
                    placeholder="https://ejemplo.com/imagen.jpg"
                    error={imageError}
                    helperText={imageError ? "URL de imagen no válida" : "Ingresa una URL válida de imagen"}
                  />
                </Grid>

                {/* Cuarta fila: Descripción */}
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    name="descripcion" 
                    label="Descripción" 
                    multiline 
                    rows={3} 
                    value={promoFormData.descripcion} 
                    onChange={handlePromoChange} 
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
                    Vista previa:
                  </Typography>
                  <Card elevation={3}>
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={imagePreview}
                        alt="Vista previa de promoción"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{
                          width: '100%',
                          height: '200px',
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
                          {promoFormData.nombre || "Nombre de promoción"}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {promoFormData.descripcion ? 
                            (promoFormData.descripcion.length > 60 ? 
                              promoFormData.descripcion.substring(0, 60) + '...' : 
                              promoFormData.descripcion
                            ) : 
                            "Descripción de promoción"
                          }
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            )}

            {/* Mensaje cuando no hay imagen */}
            {!imagePreview && promoFormData.imagen && (
              <Grid item xs={12}>
                <Box sx={{ 
                  p: 3, 
                  border: '2px dashed #ccc', 
                  borderRadius: 2, 
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9'
                }}>
                  <ImageIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {imageError ? 
                      "⚠️ No se pudo cargar la imagen. Verifica la URL." :
                      "🖼️ Ingresa una URL válida para ver la vista previa"
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Formatos soportados: JPG, PNG, GIF, WebP, SVG
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={handleClosePromoForm}
            >
              Cancelar
            </Button>
            
            <Button 
              variant="contained" 
              onClick={handleSavePromo}
              disabled={!promoFormData.nombre || !promoFormData.descripcion || !promoFormData.fechaInicio || !promoFormData.fechaFin}
              sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" } }}
            >
              {isEditMode ? 'Actualizar Promoción' : 'Crear Promoción'}
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

export default PromoAdmin;