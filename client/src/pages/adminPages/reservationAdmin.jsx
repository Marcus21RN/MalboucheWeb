import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Select, MenuItem, Button, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Snackbar, Alert, Typography, Box, FormControl, InputLabel, Divider, Grid
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CancelIcon from "@mui/icons-material/Cancel";

const ReservacionesAdmin = () => {
  const [reservaciones, setReservaciones] = useState([
    {
      _id: "RSV-0015",
      nombreCliente: "Ricardo",
      primerApellido: "Castro",
      segundoApellido: null,
      correoCliente: "ricardo.castro@hotmail.com",
      telefono: "555-1234",
      fecha: "2025-06-15",
      horaInicio: "19:00",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-01",
      estado: "confirmada",
    },
    {
      _id: "RSV-0016",
      nombreCliente: "Jorgeeeeeeeeee ",
      primerApellido: "Castro Aguilaaaaaaaaaaaaaaaaar",
      segundoApellido: null,
      correoCliente: "jorge.ckkkkkkkkkastro@hotmail.com",
      telefono: "664 555 1234",
      fecha: "2025-06-15",
      
      horaInicio: "19:00",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-01",
      estado: "confirmada",
    },
     {
      _id: "RSV-0017",
      nombreCliente: "Jorge",
      primerApellido: "Castro",
      segundoApellido: null,
      correoCliente: "jorge.castro@hotmail.com",
      telefono: "664 555 1234",
      fecha: "2025-06-15",
      
      horaInicio: "19:00",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-01",
      estado: "confirmada",
    },
     {
      _id: "RSV-0018",
      nombreCliente: "Jorge",
      primerApellido: "Castro",
      segundoApellido: null,
      correoCliente: "jorge.castro@hotmail.com",
      telefono: "664 555 1234",
      fecha: "2025-06-15",
      
      horaInicio: "19:00",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-01",
      estado: "confirmada",
    },
     {
      _id: "RSV-0019",
      nombreCliente: "Jorge",
      primerApellido: "Castro",
      segundoApellido: null,
      correoCliente: "jorge.castro@hotmail.com",
      telefono: "664 555 1234",
      fecha: "2025-06-15",
      
      horaInicio: "19:00",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-01",
      estado: "confirmada",
    },
     {
      _id: "RSV-0020",
      nombreCliente: "Jorge",
      primerApellido: "Castro",
      segundoApellido: null,
      correoCliente: "jorge.castro@hotmail.com",
      telefono: "664 555 1234",
      fecha: "2025-06-15",
      
      horaInicio: "19:00",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-01",
      estado: "confirmada",
    },
     {
      _id: "RSV-0021",
      nombreCliente: "Jorge",
      primerApellido: "Castro",
      segundoApellido: null,
      correoCliente: "jorge.castro@hotmail.com",
      telefono: "664 555 1234",
      fecha: "2025-06-15",
      
      horaInicio: "19:00",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-01",
      estado: "confirmada",
    },
  ]);

  // Filtros y paginación
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(5);

  // Estados para diálogos
  const [ticketDialog, setTicketDialog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Filtros corregidos
  const filtradas = reservaciones.filter((res) => {
    const nombreCompleto = `${res.nombreCliente} ${res.primerApellido} ${res.segundoApellido || ""}`.toLowerCase();
    const coincideNombre = nombreCompleto.includes(filtroNombre.toLowerCase());
    const coincideId = res._id.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEstado = filtroEstado ? res.estado === filtroEstado : true;
    
    return (coincideNombre || coincideId) && coincideEstado;
  });
  

  // Paginación
  const handleChangePagina = (event, nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  const handleChangeFilasPorPagina = (event) => {
    setFilasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  // Ticket
  const handleGenerarTicket = (reserva) => {
    setTicketDialog(reserva);
  };

  const handleCerrarTicket = () => {
    setTicketDialog(null);
  };

  // Diálogo de cancelación
  const handleOpenDialog = (reserva) => {
    setSelected(reserva);
    setMotivo("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelected(null);
    setOpenDialog(false);
  };

  const handleCancelReservation = () => {
    if (!motivo.trim()) return;
    
    const actualizadas = reservaciones.map((r) =>
      r._id === selected._id
        ? { ...r, estado: "cancelada", motivoCancelacion: motivo }
        : r
    );
    setReservaciones(actualizadas);
    setOpenDialog(false);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{mb:2}}>
      <Typography variant="h5" gutterBottom sx={{ color: "#660152", fontWeight: "bold", fontFamily : "Montserrat, sans-serif", textAlign:"center"}}>
        RESERVATION MANAGEMENT
      </Typography> 

      {/* Filtros */}
      <Box sx={{  display: "flex", flexWrap: "wrap", gap: 2, mb: 3, justifyContent: "flex-end" }}>
        <TextField
          label="Search by name or Folio"
          variant="outlined"
          size="small"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          sx={{ width: 250 }}
        />
        <FormControl sx={{ width: 180 }} size="small">
          <InputLabel>Estado</InputLabel>
          <Select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            label="Estado"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="confirmada">Confirmada</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{
          "& .MuiTableCell-root": {
            
            fontFamily: "Montserrat, sans-serif",
          },
        }}>
          <TableHead sx={{ backgroundColor: "rgba(102, 1, 82, 0.1)", borderBottom: "2px solid #660152" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Folio</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Time</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>People</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Client Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>C. Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#660152" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtradas.length > 0 ? (
              filtradas
                .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
                .map((res) => (
                  <TableRow key={res._id} sx={{ "&:hover": { backgroundColor: "rgba(183, 107, 163, 0.1)" }}}>
                    <TableCell sx={{ maxWidth: 100, whiteSpace: 'normal', wordBreak: 'break-word', fontWeight: 600}}>{res._id}</TableCell>
                    <TableCell sx={{ maxWidth: 100, whiteSpace: 'normal', wordBreak: 'break-word' }}>{res.fecha}</TableCell>
                    <TableCell sx={{ maxWidth: 70, whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}  >{res.horaInicio}</TableCell>
                    <TableCell sx={{ maxWidth: 70, whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }} >{res.cantidadPersonas}</TableCell>
                    <TableCell sx={{ maxWidth: 180, whiteSpace: 'normal', wordBreak: 'break-word' }}>{`${res.nombreCliente} ${res.primerApellido} ${res.segundoApellido || ""}`}</TableCell>
                    <TableCell sx={{ maxWidth: 180, whiteSpace: 'normal', wordBreak: 'break-word' }}>{res.correoCliente}</TableCell>
                    <TableCell sx={{ maxWidth: 140, whiteSpace: 'normal', wordBreak: 'break-word' }}>{res.telefono}</TableCell>
                    <TableCell  sx={{ maxWidth: 100, whiteSpace: 'normal', wordBreak: 'break-word' }}>{res.fechaReservacion}</TableCell>
                    <TableCell>
                      <Typography 
                        sx={{ 
                          color: res.estado === "confirmada" ? "#016615" : "#66011F",
                          fontWeight: 600
                        }}
                      >
                        {res.estado}
                      </Typography>
                    </TableCell>
                    <TableCell>
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => handleGenerarTicket(res)}
      startIcon={<ReceiptIcon />}
      sx={{
        borderColor: "#660152",
        backgroundColor: "#660152",
        color: "#fff",
        '&:hover': {
          backgroundColor: "#660152",
          
          color: "#fff",
        },
      }}
    >
    Ticket
    </Button>

    <Button
      variant="contained"
      color="error"
      onClick={() => handleOpenDialog(res)}
      startIcon={<CancelIcon />}
      disabled={res.estado === "cancelada"}
      sx={{
        '&:disabled': {
          backgroundColor: "#f2f2f2",
          color: "#999",
        },
      }}
    >
      Cancelar
    </Button>
  </Box>
</TableCell>

  </TableRow>
    ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No se encontraron reservaciones
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filtradas.length}
          rowsPerPage={filasPorPagina}
          page={pagina}
          onPageChange={handleChangePagina}
          onRowsPerPageChange={handleChangeFilasPorPagina}
          sx={{ color: "#660152" }}
        />
      </TableContainer>

      {/* Diálogo de Ticket */}
      <Dialog open={!!ticketDialog} onClose={handleCerrarTicket} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#660152", fontFamily:"montserrat", fontWeight: 600, background: "#f5f5f5" }}>Ticket de Reservación</DialogTitle>
        <DialogContent >
          {ticketDialog && (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={12} sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                Detalles de la Reservación
              </Typography>
              <Typography variant="h6">{ticketDialog.fechaReservacion}</Typography>
              </Grid>

              <Divider sx={{ mb: 2, borderColor: "#660152", borderWidth: 1 }} />
              <Grid container spacing={2}  >
                <Grid item xs={6}>
                  <Typography><strong>Folio:</strong> {ticketDialog._id}</Typography>
                  <Typography><strong>Cliente:</strong> {ticketDialog.nombreCliente} {ticketDialog.primerApellido}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Fecha:</strong> {ticketDialog.fecha}</Typography>
                  <Typography><strong>Hora:</strong> {ticketDialog.horaInicio}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Correo:</strong> {ticketDialog.correoCliente}</Typography>
                  <Typography><strong>Teléfono:</strong> {ticketDialog.telefono}</Typography>
                  <Typography><strong>Personas:</strong> {ticketDialog.cantidadPersonas}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCerrarTicket}
            sx={{ color: "#fff  ", background: "#660152" }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Cancelación */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#660152" }}>Cancelar Reservación</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            ¿Está seguro que desea cancelar la reservación {selected?._id}?
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Motivo de cancelación"
            fullWidth
            multiline
            minRows={3}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            sx={{ color: "#660152" }}
          >
            Volver
          </Button>
          <Button
            onClick={handleCancelReservation}
            variant="contained"
            disabled={!motivo.trim()}
            sx={{ 
              backgroundColor: "#660152",
              '&:hover': { backgroundColor: "#520040" },
              '&:disabled': { backgroundColor: "#cccccc" }
            }}
          >
            Confirmar Cancelación
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Reservación cancelada exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReservacionesAdmin;