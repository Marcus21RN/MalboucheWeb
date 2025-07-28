import React, { useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, Select, MenuItem, Button, 
  TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert, FormControl, InputLabel, Divider, Grid, Card, 
  CardContent, Chip, IconButton, Tooltip, Avatar
} from "@mui/material";
import {
  Receipt as ReceiptIcon,
  Cancel as CancelIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon
} from "@mui/icons-material";

const ReservationAdmin = () => {
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
      nombreCliente: "Jorge",
      primerApellido: "Castro Aguilar",
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
      _id: "RSV-0017",
      nombreCliente: "María",
      primerApellido: "González",
      segundoApellido: "López",
      correoCliente: "maria.gonzalez@gmail.com",
      telefono: "664 555 5678",
      fecha: "2025-06-20",
      horaInicio: "20:30",
      cantidadPersonas: 4,
      fechaReservacion: "2025-06-02",
      estado: "cancelada",
    },
    {
      _id: "RSV-0018",
      nombreCliente: "Carlos",
      primerApellido: "Mendoza",
      segundoApellido: null,
      correoCliente: "carlos.mendoza@outlook.com",
      telefono: "664 555 9012",
      fecha: "2025-06-22",
      horaInicio: "21:00",
      cantidadPersonas: 3,
      fechaReservacion: "2025-06-03",
      estado: "confirmada",
    },
    {
      _id: "RSV-0019",
      nombreCliente: "Ana",
      primerApellido: "Ramírez",
      segundoApellido: "Flores",
      correoCliente: "ana.ramirez@yahoo.com",
      telefono: "664 555 3456",
      fecha: "2025-06-25",
      horaInicio: "18:30",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-04",
      estado: "confirmada",
    },
     {
      _id: "RSV-0019",
      nombreCliente: "Ana",
      primerApellido: "Ramírez",
      segundoApellido: "Flores",
      correoCliente: "ana.ramirez@yahoo.com",
      telefono: "664 555 3456",
      fecha: "2025-06-25",
      horaInicio: "18:30",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-04",
      estado: "confirmada",
    },
     {
      _id: "RSV-0019",
      nombreCliente: "Ana",
      primerApellido: "Ramírez",
      segundoApellido: "Flores",
      correoCliente: "ana.ramirez@yahoo.com",
      telefono: "664 555 3456",
      fecha: "2025-06-25",
      horaInicio: "18:30",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-04",
      estado: "confirmada",
    },
     {
      _id: "RSV-0019",
      nombreCliente: "Ana",
      primerApellido: "Ramírez",
      segundoApellido: "Flores",
      correoCliente: "ana.ramirez@yahoo.com",
      telefono: "664 555 3456",
      fecha: "2025-06-25",
      horaInicio: "18:30",
      cantidadPersonas: 2,
      fechaReservacion: "2025-06-04",
      estado: "confirmada",
    },
  ]);

  // Estados de filtros y paginación
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

  // Filtros
  const filtradas = reservaciones.filter((res) => {
    const nombreCompleto = `${res.nombreCliente} ${res.primerApellido} ${res.segundoApellido || ""}`.toLowerCase();
    const coincideNombre = nombreCompleto.includes(filtroNombre.toLowerCase());
    const coincideId = res._id.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEstado = filtroEstado ? res.estado === filtroEstado : true;
    
    return (coincideNombre || coincideId) && coincideEstado;
  });

  // Funciones de utilidad para estilos
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada':
        return 'success';
      case 'cancelada':
        return 'error';
      default:
        return 'default';
    }
  };

  const getAvatarColor = (nombre) => {
    const colors = ['#660152', '#b76ba3', '#520040', '#8b4a6b'];
    const index = nombre.charCodeAt(0) % colors.length;
    return colors[index];
  };

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
    <Box sx={{ padding: 3 }}>
      {/* Título y controles */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="#660152" fontWeight="bold">
          Reservations Management
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
        
        <Box sx={{  display: 'flex', flexDirection: 'row', gap: 2,  }}>
          <FormControl sx={{ maxWidth: 250, minWidth: 250 }}>
            <InputLabel size="small" sx={{ width: 250, backgroundColor: 'white' }}>Filter by Status</InputLabel>
            <Select
              labelId="filter-label"
              id="filter"
              value={filtroEstado}
              label="Filter by Status"
              onChange={(e) => setFiltroEstado(e.target.value)}
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="">All Reservations</MenuItem>
              <MenuItem value="confirmada">Confirmed</MenuItem>
              <MenuItem value="cancelada">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Search by Name or Folio"
            variant="outlined"
            size="small"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            sx={{ width: 250, backgroundColor: 'white', borderRadius: 1 }}
          />
        </Box>
        
        {/* Estadísticas rápidas */}
        <Box sx={{mb: 3, display: 'flex', gap: 2, justifyContent: "flex-end" }}>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {reservaciones.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reservation Count
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {reservaciones.filter(r => r.estado === 'confirmada').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmed
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {reservaciones.filter(r => r.estado === 'cancelada').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cancelled
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
                <TableRow sx={{ backgroundColor: '#660152'}}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Folio</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Client</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date & Time</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>People</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtradas
                  .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
                  .map((res) => (
                    <TableRow 
                      key={res._id}
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <Typography variant="body1" fontFamily="montserrat" fontWeight="bold">
                          {res._id}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Created: {res.fechaReservacion}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              width: 40, 
                              height: 40,
                              backgroundColor: getAvatarColor(res.nombreCliente),
                              fontWeight: 'bold'
                            }}
                          >
                            {res.nombreCliente.charAt(0)}{res.primerApellido.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {`${res.nombreCliente} ${res.primerApellido}`}
                            </Typography>
                            {res.segundoApellido && (
                              <Typography variant="body2" color="text.secondary">
                                {res.segundoApellido}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {res.correoCliente}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {res.telefono}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body1" fontWeight="medium">
                              {new Date(res.fecha).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {res.horaInicio}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="h6" fontWeight="bold">
                            {res.cantidadPersonas}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={res.estado.toUpperCase()} 
                          color={getStatusColor(res.estado)}
                          size="small"
                          sx={{ 
                            fontWeight: 'bold',
                            minWidth: 100,
                            textTransform: 'uppercase',
                            textAlign: 'center',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Show Ticket">
                            <IconButton
                              color="primary"
                              onClick={() => handleGenerarTicket(res)}
                              size="small"
                            >
                              <ReceiptIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancellation">
                            <span>
                              <IconButton
                                color="error"
                                onClick={() => handleOpenDialog(res)}
                                disabled={res.estado === 'cancelada'}
                                size="small"
                              >
                                <CancelIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                {filtradas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Box sx={{ py: 6 }}>
                        <EventIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          There are no reservations available
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {filtroEstado ? `No reservations found with status "${filtroEstado}"` : 'There are no reservations available'}
                        </Typography>
                      </Box>
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
        </CardContent>
      </Card>

      {/* Diálogo de Ticket */}
      <Dialog open={!!ticketDialog} onClose={handleCerrarTicket} fullWidth maxWidth="sm">
        <DialogTitle sx={{ 
          color: "#660152", 
          fontFamily: "montserrat", 
          fontWeight: 600, 
          background: "#f5f5f5",
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <ReceiptIcon />
          Reservation Ticket - {ticketDialog?._id}
        </DialogTitle>
        <DialogContent>
          {ticketDialog && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom color="#660152">
                Reservation Details
              </Typography>
              <Divider sx={{ mb: 2, borderColor: "#660152", borderWidth: 1 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Folio:</strong> {ticketDialog._id}</Typography>
                  <Typography variant="body1"><strong>Client:</strong> {ticketDialog.nombreCliente} {ticketDialog.primerApellido}</Typography>
                  <Typography variant="body1"><strong>Date:</strong> {ticketDialog.fecha}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Time:</strong> {ticketDialog.horaInicio}</Typography>
                  <Typography variant="body1"><strong>People:</strong> {ticketDialog.cantidadPersonas}</Typography>
                  <Typography variant="body1"><strong>Status:</strong> {ticketDialog.estado}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1"><strong>Email:</strong> {ticketDialog.correoCliente}</Typography>
                  <Typography variant="body1"><strong>Phone:</strong> {ticketDialog.telefono}</Typography>
                  <Typography variant="body1"><strong>Creation Date:</strong> {ticketDialog.fechaReservacion}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCerrarTicket}
            variant="contained"
            sx={{ 
              backgroundColor: "#660152",
              '&:hover': { backgroundColor: "#520040" }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Cancelación */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#660152" }}>Cancel Reservation</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to cancel the reservation <strong>{selected?._id}</strong>?
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Cancellation Reason"
            fullWidth
            multiline
            minRows={3}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            sx={{ color: "#660152" }}
          >
            Cancel
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
            Confirm Cancellation
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
          Reservation cancelled successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default ReservationAdmin;