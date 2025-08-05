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
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Work as WorkIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  AssignmentInd as AssignmentIndIcon,
  VerifiedUser as VerifiedUserIcon
} from "@mui/icons-material";
import { motion } from 'framer-motion';

export default function EmployesAdmin() {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    _id: "", nombre: "", primerApellido: "", segundoApellido: "",
    correo: "", password: "", estado: "activo", IDRol: ""
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [filterRole, setFilterRole] = useState("todos");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("nombre");
  const [order, setOrder] = useState("asc");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [empleadoToStatus, setEmpleadoToStatus] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Funciones originales mantenidas
  // Nueva función para abrir el diálogo de cambio de estado
  const handleStatusClick = (empleado) => {
    setEmpleadoToStatus(empleado);
    setOpenStatusDialog(true);
  };

  // Confirmar cambio de estado (activar/desactivar)
  const [statusConfirmPassword, setStatusConfirmPassword] = useState("");
  const [statusConfirmPasswordError, setStatusConfirmPasswordError] = useState(false);

  const handleConfirmStatus = async () => {
    if (!statusConfirmPassword) {
      setStatusConfirmPasswordError(true);
      showSnackbar("Confirmation password is required.", "error");
      return;
    }
    try {
      const nuevoEstado = empleadoToStatus.estado === "activo" ? "inactivo" : "activo";
      await axios.put(`http://localhost:3000/adminBackend/empleados/${empleadoToStatus._id}`, {
        ...empleadoToStatus,
        estado: nuevoEstado,
        confirmPassword: statusConfirmPassword
      });
      fetchEmpleados();
      showSnackbar(
        nuevoEstado === "activo" ? "Employee activated successfully." : "Employee deactivated successfully.",
        "success"
      );
    } catch (error) {
      // Solo mostrar mensajes amigables para el usuario
      if (error.response?.data?.error?.toLowerCase().includes("password")) {
        setStatusConfirmPasswordError(true);
        showSnackbar("Incorrect confirmation password.", "error");
      } else {
        showSnackbar("Could not update employee status. Please try again.", "error");
      }
    } finally {
      setOpenStatusDialog(false);
      setEmpleadoToStatus(null);
      setStatusConfirmPassword("");
      setStatusConfirmPasswordError(false);
    }
  };

  const handleSubmitWithConfirmation = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.primerApellido || !formData.correo || !formData.IDRol) {
      showSnackbar("All fields are required.", "error");
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
      showSnackbar("Confirmation password is required.", "error");
      return;
    }


    const url = modoEdicion
      ? `http://localhost:3000/adminBackend/empleados/${formData._id}`
      : "http://localhost:3000/adminBackend/empleados";

    // Solo generar y enviar password si es registro nuevo
    let payload;
    if (!modoEdicion) {
      const passwordGenerada = `${formData.nombre}${formData.primerApellido.charAt(0)}123`;
      payload = { ...formData, password: passwordGenerada, confirmPassword };
    } else {
      // En edición, no enviar password
      const { password, ...rest } = formData;
      payload = { ...rest, confirmPassword };
    }

    try {
      if (modoEdicion) {
        await axios.put(url, payload);
        showSnackbar("Employee updated successfully.", "success");
      } else {
        await axios.post(url, payload);
        showSnackbar("Employee registered successfully.", "success");

        // --- AQUÍ SE ENVÍA EL CORREO DE BIENVENIDA ---
        await axios.post("http://localhost:3000/adminBackend/email/bienvenida-empleado", {
          toEmail: formData.correo,
          nombre: formData.nombre,
          primerApellido: formData.primerApellido,
          // eslint-disable-next-line no-undef
          password: passwordGenerada,
          IDRol: formData.IDRol
        });
        // --- FIN ENVÍO CORREO ---
      }
      fetchEmpleados();
      resetForm();
    } catch (error) {
      // Validación de correo duplicado y otros mensajes amigables
      const msg = error.response?.data?.error || "Could not save employee. Please try again.";
      if (msg.toLowerCase().includes("email is already registered")) {
        setConfirmPasswordError(true);
        showSnackbar("This email is already registered. Please use another email.", "error");
      } else if (msg.toLowerCase().includes("password")) {
        setConfirmPasswordError(true);
        showSnackbar("Incorrect confirmation password.", "error");
      } else {
        showSnackbar("Could not save employee. Please try again.", "error");
      }
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

    const matchesRole =
      filterRole === "todos" || emp.IDRol === filterRole;

    return matchesSearch && matchesEstado && matchesRole;
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

  useEffect(() => { fetchEmpleados(); },);

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
      correo: "", password: "", estado: "activo", IDRol: ""
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
      sx={{ padding:1}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
        <PersonIcon sx={{ mr: 2, color: '#660152', fontSize: 50, backgroundColor: '#FFE6FA', borderRadius: '50%', padding: '8px' }} />
        <Typography variant="h5" color="#660152" fontWeight="bold">
          Employees Management
        </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'  }}>
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap:2}}>
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

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label="Search by name, email or ID"
            variant="outlined"
            size="small"
            sx={{ width: 250, backgroundColor: 'white' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl size="small" sx={{ width: 120, backgroundColor: 'white' }}>
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
          <FormControl size="small" sx={{ width: 120, backgroundColor: 'white' }}>
            <InputLabel>Filter by Role</InputLabel>
              <Select
              value={filterRole}
              label="Filter by Role"
              onChange={(e) => setFilterRole(e.target.value)}
              >
              <MenuItem value="todos">All</MenuItem>
              <MenuItem value="ADMIN">Administrator</MenuItem>
              <MenuItem value="EMPLE">Employee</MenuItem>
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
        <Card  sx={{ minWidth: 120,  }} >

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
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'montserrat' }} onClick={() => handleSort("_id")}>
                    ID {orderBy === "_id" && (order === "asc" ? "▲" : "▼")}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'montserrat' }} onClick={() => handleSort("nombre")}>
                    Employee {orderBy === "nombre" && (order === "asc" ? "▲" : "▼")}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'montserrat' }} onClick={() => handleSort("correo")}>
                    Email {orderBy === "correo" && (order === "asc" ? "▲" : "▼")}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat',  }}>Role</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat',  }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'montserrat', }}>Actions</TableCell>
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
                            fontWeight: 'bold',
                            fontSize: '18px',
                            fontFamily: 'montserrat'
                          }}
                        >
                          {emp.nombre.charAt(0)}{emp.primerApellido.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '16px' }}>
                            {`${emp.primerApellido} ${emp.segundoApellido}`}
                          </Typography>
                          {emp.nombre && (
                            <Typography variant="body2" color="text.secondary " sx={{ fontSize: '14px'  , fontFamily: 'montserrat' }}>
                              {emp.nombre}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontFamily="montserrat" fontWeight="bold" sx={{ fontSize: '14px' }}>
                        {emp.correo}
                      </Typography>
                    </TableCell>
                    <TableCell >
                      <Chip 
                        icon={getRoleIcon(emp.IDRol)}
                        label={emp.IDRol === 'ADMIN' ? 'ADMIN' : 'EMPLOYEE'} 
                        color={getRoleColor(emp.IDRol)}
                        size="small"
                        sx={{ 
                          fontWeight: 'bold',
                          minWidth: 100,
                          maxWidth: 120,
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '12px',
                          fontFamily: 'montserrat',
                      

                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={emp.estado === "activo" ? "ACTIVE" : "INACTIVE"}
                        color={getStatusColor(emp.estado)}
                        size="small"
                        
                        sx={{ 
                          fontWeight: 'bold',
                          minWidth: 80,
                          maxWidth: 90,
                          textAlign: 'center',
                          display: 'flex',
                          fontSize: '12px',
                          fontFamily: 'montserrat',
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
                      {emp.estado === "activo" ? (
                        <Tooltip title="Deactivate employee">
                          <IconButton
                            color="error"
                            onClick={() => handleStatusClick(emp)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Activate employee">
                          <IconButton
                            color="success"
                            onClick={() => handleStatusClick(emp)}
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
      <Dialog open={openDialog} onClose={resetForm} fullWidth maxWidth="md" sx={{height: '90vh'}}>
        <DialogTitle sx={{ color: "#fff", fontWeight: "bold", fontFamily: "montserrat", backgroundColor: "#660152" }}>
          {modoEdicion ? "Update Employee" : "New Employee"}
        </DialogTitle>
        <form onSubmit={handleSubmitWithConfirmation}>
          <DialogContent >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2, }}>
              
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

      {/* Diálogo de confirmación para activar/desactivar */}
      <Dialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
      >
        <DialogTitle sx={{ color: "#660152" }}>
          {empleadoToStatus?.estado === "activo" ? "Deactivate employee" : "Activate employee"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {empleadoToStatus?.estado === "activo"
              ? "Are you sure you want to deactivate this employee? You will be able to reactivate them later."
              : "Are you sure you want to activate this employee?"}
          </Typography>
          <form onSubmit={e => { e.preventDefault(); handleConfirmStatus(); }}>
            <TextField
              label="Confirmation password"
              type="password"
              value={statusConfirmPassword}
              onChange={e => { setStatusConfirmPassword(e.target.value); setStatusConfirmPasswordError(false); }}
              error={statusConfirmPasswordError}
              helperText={statusConfirmPasswordError ? "Incorrect password" : ""}
              fullWidth
              sx={{ mt: 2 }}
              autoFocus
            />
            <DialogActions>
              <Button 
                onClick={() => setOpenStatusDialog(false)}
                sx={{ color: "#660152" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  backgroundColor: "#660152",
                  '&:hover': { backgroundColor: "#520040" }
                }}
                startIcon={<DeleteIcon />}
              >
                {empleadoToStatus?.estado === "activo" ? "Desactivar" : "Activar"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para guardar/editar */}
      <Dialog
        open={openSaveDialog}
        onClose={() => setOpenSaveDialog(false)}
      >
        <DialogTitle sx={{ color: "#660152" }}>
          {modoEdicion ? "Confirm Update" : "Confirm Registration"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {modoEdicion
              ? "Are you sure you want to update this employee's information?"
              : "Are you sure you want to register this new employee?"}
          </Typography>
          {!modoEdicion && (
            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
              An email will be sent to the employee with their access credentials.
            </Typography>
          )}
          <form onSubmit={e => { e.preventDefault(); handleConfirmSave(); }}>
            <TextField
              label="Confirmation password"
              type="password"
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setConfirmPasswordError(false); }}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Incorrect password" : ""}
              fullWidth
              sx={{ mt: 2 }}
              autoFocus
            />
            <DialogActions>
              <Button 
                onClick={() => setOpenSaveDialog(false)}
                sx={{ color: "#660152" }}
              >
                Cancel
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
                {modoEdicion ? "Confirm Update" : "Confirm Registration"}
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