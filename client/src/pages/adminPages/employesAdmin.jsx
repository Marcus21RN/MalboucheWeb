""// Archivo: EmployesAdmin.jsx

import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
  Typography, Box, Snackbar, Alert, TablePagination
} from "@mui/material";
import {
  Edit as EditIcon, Delete as DeleteIcon,
  Add as AddIcon, Save as SaveIcon, Cancel as CancelIcon
} from "@mui/icons-material";

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
 

  const handleDeleteClick = (id) => {
    setEmpleadoToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/adminBackend/empleados/${empleadoToDelete}`, { 
        method: "DELETE" 
      });
      if (res.ok) {
        fetchEmpleados();
        showSnackbar("Empleado eliminado", "success");
      }
    } catch (error) {
      showSnackbar("Error al eliminar empleado", "error");
    } finally {
      setOpenDeleteDialog(false);
      setEmpleadoToDelete(null);
    }
  };

  // Diálogo de confirmación para guardar/editar
  const handleSubmitWithConfirmation = async (e) => {
  e.preventDefault();
  
  // Validación básica
  if (!formData.nombre || !formData.primerApellido || !formData.correo) {
    showSnackbar("Por favor complete los campos requeridos", "error");
    return;
  }
  
  if (!modoEdicion && !formData.password) {
    showSnackbar("La contraseña es requerida para nuevos empleados", "error");
    return;
  }

  setOpenSaveDialog(true);
};

  const handleConfirmSave = async () => {
    const url = modoEdicion
      ? `http://localhost:3000/adminBackend/empleados/${formData._id}`
      : "http://localhost:3000/adminBackend/empleados";
    const method = modoEdicion ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchEmpleados();
        resetForm();
        showSnackbar(
          modoEdicion ? "Empleado actualizado" : "Empleado registrado", 
          "success"
        );
      } else {
        const error = await res.json();
        showSnackbar("Error: " + error.error, "error");
      }
    } catch (error) {
      showSnackbar("Error en la operación", "error");
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
      const res = await fetch("http://localhost:3000/adminBackend/empleados");
      const data = await res.json();
      setEmpleados(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = modoEdicion
      ? `http://localhost:3000/adminBackend/empleados/${formData._id}`
      : "http://localhost:3000/adminBackend/empleados";
    const method = modoEdicion ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchEmpleados();
        resetForm();
        showSnackbar(modoEdicion ? "Empleado actualizado" : "Empleado registrado", "success");
      } else {
        const error = await res.json();
        showSnackbar("Error: " + error.error, "error");
      }
    } catch (error) {
      showSnackbar("Error en la operación", "error");
    }
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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/adminBackend/empleados/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEmpleados();
        showSnackbar("Empleado eliminado", "success");
      }
    } catch (error) {
      showSnackbar("Error al eliminar empleado", "error");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#660152", fontWeight: "bold", fontFamily : "Montserrat, sans-serif", textAlign:"center" }}>
        EMPLOYEES MANAGEMENT
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: "#660152", '&:hover': { backgroundColor: "#520040" } }}
            onClick={() => setOpenDialog(true)}
          >
            New Employee
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <TextField
            label="Search by name, email or ID"
            variant="outlined"
            size="small"
            sx={{ width: 250 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>Filter by status</InputLabel>
            <Select
              value={filterEstado}
              label="Filtrar por estado"
              onChange={(e) => setFilterEstado(e.target.value)}
            >
              <MenuItem value="todos">All</MenuItem>
              <MenuItem value="activo">Active</MenuItem>
              <MenuItem value="inactivo">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

            {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle sx={{ color: "#660152" }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro que deseas eliminar este empleado? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ color: "#660152" }}
          >
            Cancelar
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
            Confirmar Eliminación
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
              ? "¿Estás seguro que deseas actualizar los datos de este empleado?"
              : "¿Estás seguro que deseas registrar este nuevo empleado?"}
          </Typography>
          {!modoEdicion && (
            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
              Se enviará un correo al empleado con sus credenciales de acceso.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenSaveDialog(false)}
            sx={{ color: "#660152" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmSave}
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
      </Dialog>

      <Dialog open={openDialog} onClose={resetForm} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#660152" }}>
          {modoEdicion ? "Editar Empleado" : "Nuevo Empleado"}
        </DialogTitle>
        <form onSubmit={handleSubmitWithConfirmation}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="ID" name="_id" value={formData._id} onChange={handleChange} required disabled={modoEdicion} type="number" fullWidth />
              <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required fullWidth />
              <TextField label="Primer Apellido" name="primerApellido" value={formData.primerApellido} onChange={handleChange} required fullWidth />
              <TextField label="Segundo Apellido" name="segundoApellido" value={formData.segundoApellido || ""} onChange={handleChange} fullWidth />
              <TextField label="Correo" type="email" name="correo" value={formData.correo} onChange={handleChange} required fullWidth />
              <TextField label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} required={!modoEdicion} fullWidth />
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select name="estado" value={formData.estado} onChange={handleChange} label="Estado">
                  <MenuItem value="activo">Activo</MenuItem>
                  <MenuItem value="inactivo">Inactivo</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select name="IDRol" value={formData.IDRol} onChange={handleChange} label="Rol">
                  <MenuItem value="ADMIN">Administrador</MenuItem>
                  <MenuItem value="EMPLE">Empleado</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetForm} startIcon={<CancelIcon />} color="inherit">
              Cancelar
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
              {modoEdicion ? "Actualizar" : "Guardar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

<TableContainer component={Paper} elevation={3}>
        <Table sx={{"& .MuiTableCell-root": {color: "#660152",fontFamily: "Montserrat, sans-serif"}}}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(183, 107, 163, 0.3)" }}>
              <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleSort("_id")}>ID {orderBy === "_id" && (order === "asc" ? "▲" : "▼")}</TableCell>
              <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleSort("nombre")}>Nombre {orderBy === "nombre" && (order === "asc" ? "▲" : "▼")}</TableCell>
              <TableCell sx={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => handleSort("correo")}>Correo {orderBy === "correo" && (order === "asc" ? "▲" : "▼")}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Rol</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmpleados.map((emp) => (
              <TableRow key={emp._id} sx={{ "&:hover": { backgroundColor: "rgba(183, 107, 163, 0.1)" } }}>
                <TableCell>{emp._id}</TableCell>
                <TableCell>{`${emp.nombre} ${emp.primerApellido} ${emp.segundoApellido || ""}`}</TableCell>
                <TableCell>{emp.correo}</TableCell>
                <TableCell>
                  <Typography sx={{ color: emp.estado === "activo" ? "#016615" : "#66011F", fontWeight: 600 }}>
                    {emp.estado}
                  </Typography>
                </TableCell>
                <TableCell>{emp.IDRol}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleEdit(emp)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDeleteClick(emp._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {empleados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay empleados registrados
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

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
