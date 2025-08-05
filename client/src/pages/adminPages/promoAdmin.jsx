/* eslint-disable no-unused-vars */
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
  Cancel as CancelIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Close as CloseIcon,
  LocalOffer as PromoIcon,
  Image as ImageIcon
} from "@mui/icons-material";
import { motion } from 'framer-motion';

import axios from 'axios';

const PromoAdmin = () => {
  const [promos, setPromos] = useState([]);
  const [filteredPromos, setFilteredPromos] = useState([]);
  const [filter, setFilter] = useState('');
  const [openPromoForm, setOpenPromoForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [localImageUrl, setLocalImageUrl] = useState(null);

  // Estado para el formulario
  const [promoFormData, setPromoFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "activo",
    imagen: ""
  });

  useEffect(() => {
    fetchPromos();
  },);

  const fetchPromos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/adminBackend/promos");
      const now = new Date();
      // Update status based on dates
      const updatedPromos = await Promise.all(res.data.map(async (promo) => {
        const start = new Date(promo.fechaInicio);
        const end = new Date(promo.fechaFin);
        let newEstado = promo.estado;
        if (now > end && promo.estado !== 'inactivo') {
          // Auto-deactivate if event is over
          newEstado = 'inactivo';
          // Optionally update backend
          try {
            await axios.put(`http://localhost:3000/adminBackend/promos/${promo._id}`, { ...promo, estado: 'inactivo' });
          } catch (e) {/* ignore error on auto-update */}
        } else if (now >= start && now <= end && promo.estado !== 'activo') {
          // Auto-activate if event is ongoing
          newEstado = 'activo';
          try {
            await axios.put(`http://localhost:3000/adminBackend/promos/${promo._id}`, { ...promo, estado: 'activo' });
          } catch (e) {/* ignore error on auto-update */}
        }
        return { ...promo, estado: newEstado };
      }));
      setPromos(updatedPromos);
      setFilteredPromos(updatedPromos);
    } catch (error) {
      setPromos([]);
      setFilteredPromos([]);
      showSnackbar("Failed to load promotions.", "error");
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
  const formatDateInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    // Ajustar a zona local para evitar desfase
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 10);
  };

  const [editingPromoId, setEditingPromoId] = useState(null);

  const handleOpenPromoForm = (promo = null) => {
    if (promo) {
      setIsEditMode(true);
      setEditingPromoId(promo._id);
      setPromoFormData({
        nombre: promo.nombre,
        descripcion: promo.descripcion,
        fechaInicio: formatDateInput(promo.fechaInicio),
        fechaFin: formatDateInput(promo.fechaFin),
        estado: promo.estado,
        imagen: promo.imagen || ""
      });
      setImagePreview(promo.imagen);
      setLocalImageUrl(null);
    } else {
      setIsEditMode(false);
      setEditingPromoId(null);
      setPromoFormData({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: "activo",
        imagen: ""
      });
      setImagePreview(null);
      setLocalImageUrl(null);
    }
    setImageError(false);
    setOpenPromoForm(true);
  };

  const handleClosePromoForm = () => {
    setOpenPromoForm(false);
    setIsEditMode(false);
    setEditingPromoId(null);
    setImagePreview(null);
    setImageError(false);
    setPromoFormData({
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

    // Date validation for promotions
  const validatePromoDates = (fechaInicio, fechaFin) => {
    const today = new Date();
    today.setHours(0,0,0,0); // Ignore time
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const maxFuture = new Date();
    maxFuture.setMonth(today.getMonth() + 1);

    if (!fechaInicio || !fechaFin) {
      return "Both start and end dates are required.";
    }
    if (start < today) {
      return "Start date cannot be in the past.";
    }
    if (end < today) {
      return "End date cannot be in the past.";
    }
    if (end < start) {
      return "End date cannot be before start date.";
    }
    if (start > maxFuture || end > maxFuture) {
      return "Promotion dates cannot be more than 1 month in the future.";
    }
    return null; // No error
  };

  const handleSavePromo = async () => {
    const errorMsg = validatePromoDates(promoFormData.fechaInicio, promoFormData.fechaFin);
    if (errorMsg) {
      showSnackbar(errorMsg, 'error');
      return;
    }
    try {
      if (isEditMode && editingPromoId) {
        await axios.put(`http://localhost:3000/adminBackend/promos/${editingPromoId}`, promoFormData);
        showSnackbar("Promotion updated successfully", "success");
      } else {
        await axios.post("http://localhost:3000/adminBackend/promos", promoFormData);
        showSnackbar("Promotion created successfully", "success");
      }
      fetchPromos();
      handleClosePromoForm();
    } catch (error) {
      showSnackbar("Failed to save promotion.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/adminBackend/promos/${id}`);
      showSnackbar("Promotion deleted successfully", "success");
      fetchPromos();
    } catch (error) {
      showSnackbar("Failed to delete promotion.", "error");
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
            Promotion Management
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{  display: 'flex', flexDirection: 'row', gap: 2,  }}>
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
                Create Promotion
              </Button>  
              <FormControl size="small" sx={{ width: 250, backgroundColor: 'white' }}>
                <InputLabel id="filter-label">Filter by status</InputLabel>
                  <Select
                    labelId="filter-label"
                    id="filter"
                    value={filter}
                    label="Filter by status"
                    onChange={handleFilterChange}
                    size="small"
                  >
                    <MenuItem value="">All promotions</MenuItem>
                    <MenuItem value="activo">Active</MenuItem>
                    <MenuItem value="inactivo">Inactive</MenuItem>
                  </Select>
                </FormControl>

            </Box>

      {/* Estadísticas rápidas */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: "flex-end" }}>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {promos.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Promotions
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {promos.filter(p => p.estado === 'activo').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              {promos.filter(p => p.estado === 'inactivo').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inactive
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {promos.filter(p => isPromoActive(p.fechaInicio, p.fechaFin)).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ongoing
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
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Promotion</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Validity</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
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
                        {new Date(promo.fechaInicio).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        to {new Date(promo.fechaFin).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short', 
                          year: 'numeric'
                        })}
                      </Typography>
                      {isPromoActive(promo.fechaInicio, promo.fechaFin) && (
                        <Chip 
                          label="ONGOING" 
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ mt: 0.5, fontSize: '0.7rem' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={promo.estado === 'activo' ? 'ACTIVE' : promo.estado === 'inactivo' ? 'INACTIVE' : promo.estado.toUpperCase()} 
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
                        <Tooltip title="Edit promotion">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenPromoForm(promo)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {promo.estado === 'activo' ? (
                          <Tooltip title="Deactivate promotion">
                            <IconButton
                              color="error"
                              onClick={async () => {
                                try {
                                  await axios.put(`http://localhost:3000/adminBackend/promos/${promo._id}`, {
                                    ...promo,
                                    estado: 'inactivo'
                                  });
                                  showSnackbar("Promotion deactivated successfully", "success");
                                  fetchPromos();
                                } catch (error) {
                                  showSnackbar("Failed to deactivate promotion.", "error");
                                }
                              }}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Activate promotion">
                            <IconButton
                              sx={{ color: 'green' }}
                              onClick={async () => {
                                try {
                                  await axios.put(`http://localhost:3000/adminBackend/promos/${promo._id}`, {
                                    ...promo,
                                    estado: 'activo'
                                  });
                                  showSnackbar("Promotion activated successfully", "success");
                                  fetchPromos();
                                } catch (error) {
                                  showSnackbar("Failed to activate promotion.", "error");
                                }
                              }}
                              size="small"
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
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
                          No promotions found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {filter ? `No promotions with status "${filter}"` : 'No promotions available'}
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
            {isEditMode ? "Edit Promotion" : "Create New Promotion"}
            </Typography>
            <IconButton onClick={handleClosePromoForm}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            {/* Columna izquierda - Formulario */}
            <Grid item xs={12} md={imagePreview ? 8 : 12}>
              <Grid container spacing={2}>
                {/* Primera fila:Nombre */}
                <Box sx={{ width: '100%' }}>
                  <Grid item xs={12} md={6}>
                    <TextField 
                      fullWidth 
                      name="nombre" 
                      label="Promotion name" 
                      value={promoFormData.nombre} 
                      onChange={handlePromoChange} 
                      required
                    />
                  </Grid>
                </Box>
                {/* Segunda fila: Fechas */}
                  <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, width: '100%'}}>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                       <TextField 
                      fullWidth 
                      name="fechaInicio" 
                      label="Start date" 
                      type="date"
                      value={promoFormData.fechaInicio} 
                      onChange={handlePromoChange} 
                      InputLabelProps={{ shrink: true }}
                      required
                      
                    />
                    <TextField 
                      fullWidth 
                      name="fechaFin" 
                      label="End date" 
                      type="date"
                      value={promoFormData.fechaFin} 
                      onChange={handlePromoChange} 
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
                      value={promoFormData.estado} 
                      onChange={handlePromoChange}
                      required
                    >
                      <MenuItem value="activo">Active</MenuItem>
                      <MenuItem value="inactivo">Inactive</MenuItem>
                    </TextField>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<ImageIcon />}
                      sx={{ border: '1px solid #c4c4c4', backgroundColor: '#f5f5f5', color: '#660152', '&:hover': { backgroundColor: '#e0e0e0' } }}
                    >
                    {promoFormData.imagen ? 'Change image' : 'Select image'}
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
                        // Subida a Cloudinary
                        const formData = new FormData();
                        formData.append('file', file);
                        try {
                          const res = await axios.post('http://localhost:3000/adminBackend/upload/image', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                          });
                          setPromoFormData(prev => ({ ...prev, imagen: res.data.url }));
                          setImagePreview(res.data.url);
                          setLocalImageUrl(null);
                          setImageError(false);
                          showSnackbar('Image uploaded successfully', 'success');
                          // Release memory of local preview
                          URL.revokeObjectURL(localUrl);
                        } catch (err) {
                          setImageError(true);
                          setLocalImageUrl(null);
                          showSnackbar('Error uploading image', 'error');
                        }
                      }}
                    />
                    </Button>
                  </Box>
                </Box>
                
                {/* Cuarta fila: Descripción */}
                <Box sx={{ width: '100%' }}>
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
                </Box>

              </Grid>
            </Grid>

            {/* Columna derecha - Vista previa de imagen */}
            {(imagePreview || localImageUrl) && (
              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'sticky', top: 0 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                   Preview:
                  </Typography>
                  <Card elevation={3}>
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={localImageUrl || imagePreview}
                        alt="Promotion Preview"
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
                          {promoFormData.nombre || "Promotion Name"}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {promoFormData.descripcion ? 
                            (promoFormData.descripcion.length > 60 ? 
                              promoFormData.descripcion.substring(0, 60) + '...' : 
                              promoFormData.descripcion
                            ) : 
                            "Promotion description"
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
                    {imageError ? "Could not load image. Check the URL." :
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

          <Box sx={{ display: 'flex', justifyContent:'flex-end', gap: 1, mt: 4 }}>
            <Button 
              startIcon={<CancelIcon color="error" />} color="inherit" sx={{ border: '1px solid #660152', backgroundColor: 'transparent', '&:hover': { backgroundColor: '#f5f5f5' } }} 
              onClick={handleClosePromoForm}
            >
              Cancel
            </Button>
            
            <Button 
              variant="contained" 
              onClick={handleSavePromo}
              disabled={!promoFormData.nombre || !promoFormData.descripcion || !promoFormData.fechaInicio || !promoFormData.fechaFin}
              sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" } }}
            >
              {isEditMode ? 'Update Promotion' : 'Create Promotion'}
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