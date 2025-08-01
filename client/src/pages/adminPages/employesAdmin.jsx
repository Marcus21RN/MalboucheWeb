/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
// Configurar interceptor global para enviar el token JWT en cada petición
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination
} from "@mui/material";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Work as WorkIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";
import { motion } from 'framer-motion';

export default function EmployesAdmin() {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    _id: "", nombre: "", primerApellido: "", segundoApellido: "",
    correo: "", password: "", estado: "activo", IDRol: "EMPLE"
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("nombre");
  const [order, setOrder] = useState("asc");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [empleadoToDelete, setEmpleadoToDelete] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Funciones originales mantenidas
  const handleDeleteClick = (id) => {
    setEmpleadoToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/adminBackend/empleados/${empleadoToDelete}`);
      fetchEmpleados();
      showSnackbar("Empleado eliminado", "success");
    } catch (error) {
      showSnackbar("Error al eliminar empleado", "error");
    } finally {
      setOpenDeleteDialog(false);
      setEmpleadoToDelete(null);
    }
  };

  const handleSubmitWithConfirmation = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.primerApellido || !formData.correo) {
      showSnackbar("Por favor complete los campos requeridos", "error");
      return;
    }
    setConfirmPassword("");
    setConfirmPasswordError(false);
    setOpenSaveDialog(true);
  };

  // ...existing code...

  const handleConfirmSave = async () => {
    if (!confirmPassword) {
      setConfirmPasswordError(true);
      showSnackbar("La contraseña de confirmación es requerida", "error");
      return;
    }

    const url = modoEdicion
      ? `http://localhost:3000/adminBackend/empleados/${formData._id}`
      : "http://localhost:3000/adminBackend/empleados";

    // Generar la contraseña solo si es registro nuevo
    let passwordGenerada = formData.password;
    if (!modoEdicion) {
      passwordGenerada = `${formData.nombre}${formData.primerApellido.charAt(0)}123`;
    }

    // Enviar la contraseña de confirmación al backend
    const payload = { ...formData, password: passwordGenerada, confirmPassword };

    try {
      if (modoEdicion) {
        await axios.put(url, payload);
        showSnackbar("Empleado actualizado", "success");
      } else {
        await axios.post(url, payload);
        showSnackbar("Empleado registrado", "success");

        // --- AQUÍ SE ENVÍA EL CORREO DE BIENVENIDA ---
        await axios.post("http://localhost:3000/adminBackend/email/bienvenida-empleado", {
          toEmail: formData.correo,
          nombre: formData.nombre,
          primerApellido: formData.primerApellido,
          password: passwordGenerada,
          IDRol: formData.IDRol
        });
        // --- FIN ENVÍO CORREO ---
      }
      fetchEmpleados();
      resetForm();
    } catch (error) {
      const msg = error.response?.data?.error || "Error en la operación";
      setConfirmPasswordError(true);
      showSnackbar("Error: " + msg, "error");
    } finally {
      setOpenSaveDialog(false);
    }
  };

  const empleadosFiltrados = empleados.filter((emp) => {
    const matchesSearch =
      `${emp.nombre} ${emp.primerApellido} ${emp.segundoApellido || ""} ${emp.correo} ${emp._id}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesEstado =
      filterEstado === "todos" || emp.estado === filterEstado;

    return matchesSearch && matchesEstado;
  });

  const sortedEmpleados = [...empleadosFiltrados].sort((a, b) => {
    const aVal = a[orderBy]?.toString().toLowerCase() || "";
    const bVal = b[orderBy]?.toString().toLowerCase() || "";
    return order === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const paginatedEmpleados = sortedEmpleados.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchEmpleados = async () => {
    try {
      const res = await axios.get("http://localhost:3000/adminBackend/empleados");
      setEmpleados(res.data);
    } catch (error) {
      showSnackbar("Error al cargar empleados", "error");
    }
  };

  useEffect(() => { fetchEmpleados(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const resetForm = () => {
    setFormData({
      _id: "", nombre: "", primerApellido: "", segundoApellido: "",
      correo: "", password: "", estado: "activo", IDRol: "EMPLE"
    });
    setModoEdicion(false);
    setOpenDialog(false);
  };

  const handleEdit = (empleado) => {
    setFormData(empleado);
    setModoEdicion(true);
    setOpenDialog(true);
  };

  // Funciones de utilidad para estilos
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

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'primary';
      case 'EMPLE':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'ADMIN':
        return <AdminIcon />;
      case 'EMPLE':
        return <WorkIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#273179', '#216601', '#660154', '#660121', '#f7b330', '#460166'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Box component={motion.div} 
      sx={{ padding: 3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PersonIcon sx={{ mr: 2, color: '#660152', fontSize: 40 }} />
        <Typography variant="h4" color="#660152" fontWeight="bold">
          Employees Management
        </Typography>
      </Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ 
            backgroundColor: "#660152", 
            '&:hover': { backgroundColor: "#520040" },
            alignSelf: 'flex-start'
          }}
        >
          Add Employee
        </Button>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            label="Search by name, email or ID"
            variant="outlined"
            size="small"
            sx={{ width: 250, backgroundColor: 'white' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl size="small" sx={{ width: 180, backgroundColor: 'white' }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filterEstado}
              label="Filter by Status"
              onChange={(e) => setFilterEstado(e.target.value)}
            >
              <MenuItem value="todos">All</MenuItem>
              <MenuItem value="activo">Active</MenuItem>
              <MenuItem value="inactivo">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Estadísticas rápidas */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: "flex-end" }}>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {empleados.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Users
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {empleados.filter(e => e.estado === 'activo').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              {empleados.filter(e => e.estado === 'inactivo').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inactive
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 120 }}>
          <CardContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {empleados.filter(e => e.IDRol === 'ADMIN').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administrators
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
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSort("_id")}>
                    ID {orderBy === "_id" && (order === "asc" ? "▲" : "▼")}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSort("nombre")}>
                    Employee {orderBy === "nombre" && (order === "asc" ? "▲" : "▼")}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSort("correo")}>
                    Email {orderBy === "correo" && (order === "asc" ? "▲" : "▼")}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEmpleados.map((emp) => (
                  <TableRow 
                    key={emp._id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="body1" fontFamily="montserrat" fontWeight="bold">
                        {emp._id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            width: 50, 
                            height: 50,
                            backgroundColor: getAvatarColor(emp.nombre),
                            fontWeight: 'bold'
                          }}
                        >
                          {emp.nombre.charAt(0)}{emp.primerApellido.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {`${emp.nombre} ${emp.primerApellido}`}
                          </Typography>
                          {emp.segundoApellido && (
                            <Typography variant="body2" color="text.secondary">
                              {emp.segundoApellido}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {emp.correo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        icon={getRoleIcon(emp.IDRol)}
                        label={emp.IDRol === 'ADMIN' ? 'Admin' : 'Employee'} 
                        color={getRoleColor(emp.IDRol)}
                        size="small"
                        sx={{ 
                          fontWeight: 'medium',
                          minWidth: 100,
                          maxWidth: 120,
                          textAlign: 'center',
                          display: 'flex',
                          
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={emp.estado.toUpperCase()} 
                        color={getStatusColor(emp.estado)}
                        size="small"
                        sx={{ 
                          fontWeight: 'medium',
                          minWidth: 80,
                          maxWidth: 90,
                          textAlign: 'center',
                          display: 'flex',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Update employee">
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(emp)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete employee">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(emp._id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {empleados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Box sx={{ py: 6 }}>
                        <PersonIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          There are no employees available
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={sortedEmpleados.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog original para crear/editar */}
      <Dialog open={openDialog} onClose={resetForm} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#660152", fontWeight: "bold" }}>
          {modoEdicion ? "Update Employee" : "New Employee"}
        </DialogTitle>
        <form onSubmit={handleSubmitWithConfirmation}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
              <TextField 
                label="Name" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
                fullWidth 
              />
              <TextField 
                label="First Last Name" 
                name="primerApellido" 
                value={formData.primerApellido} 
                onChange={handleChange} 
                required 
                fullWidth 
              />
              <TextField 
                label="Second Last Name" 
                name="segundoApellido" 
                value={formData.segundoApellido || ""} 
                onChange={handleChange} 
                fullWidth 
              />
              </Box>


              <TextField 
                label="Email" 
                type="email" 
                name="correo" 
                value={formData.correo} 
                onChange={handleChange} 
                required 
                fullWidth 
              />
              <Box sx={{ display: "flex", gap: 2 }}>
<FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="estado" value={formData.estado} onChange={handleChange} label="Status">
                  <MenuItem value="activo">Active</MenuItem>
                  <MenuItem value="inactivo">Inactive</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select name="IDRol" value={formData.IDRol} onChange={handleChange} label="Role">
                  <MenuItem value="ADMIN">Administrator</MenuItem>
                  <MenuItem value="EMPLE">Employee</MenuItem>
                </Select>
              </FormControl>
              </Box>
              
            </Box>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={resetForm} startIcon={<CancelIcon />} color="inherit">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<SaveIcon />} 
              sx={{ 
                backgroundColor: "#660152", 
                '&:hover': { backgroundColor: "#520040" } 
              }}
            >
              {modoEdicion ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle sx={{ color: "#660152" }}>
          Accept
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ color: "#660152" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ 
              backgroundColor: "#660152",
              '&:hover': { backgroundColor: "#520040" }
            }}
            startIcon={<DeleteIcon />}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para guardar/editar */}
      <Dialog
        open={openSaveDialog}
        onClose={() => setOpenSaveDialog(false)}
      >
        <DialogTitle sx={{ color: "#660152" }}>
          {modoEdicion ? "Confirmar Actualización" : "Confirmar Registro"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {modoEdicion
              ? "¿Estás seguro de que deseas actualizar la información de este empleado?"
              : "¿Estás seguro de que deseas registrar este nuevo empleado?"}
          </Typography>
          {!modoEdicion && (
            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
              Se enviará un correo al empleado con sus credenciales de acceso.
            </Typography>
          )}
          <form onSubmit={e => { e.preventDefault(); handleConfirmSave(); }}>
            <TextField
              label="Contraseña de confirmación"
              type="password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setConfirmPasswordError(false); }}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Contraseña incorrecta" : ""}
              fullWidth
              sx={{ mt: 2 }}
              autoFocus
            />
            <DialogActions>
              <Button 
                onClick={() => setOpenSaveDialog(false)}
                sx={{ color: "#660152" }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  backgroundColor: "#660152",
                  '&:hover': { backgroundColor: "#520040" }
                }}
                startIcon={<SaveIcon />}
              >
                {modoEdicion ? "Confirmar Actualización" : "Confirmar Registro"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

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
}