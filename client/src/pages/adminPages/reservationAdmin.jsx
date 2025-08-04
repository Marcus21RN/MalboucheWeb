import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados de filtros y paginación
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  // Eliminado filtro de rango de fechas
  const [filtroDiaSemana, setFiltroDiaSemana] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(5);

  // Estados para diálogos
  const [ticketDialog, setTicketDialog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  // Fetch de reservaciones desde el backend
  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Si hay filtro de día de la semana
        if (filtroDiaSemana !== "") {
          const res = await axios.get("http://localhost:3000/adminBackend/reservations/by-weekday", {
            params: { weekday: filtroDiaSemana }
          });
          setReservaciones(res.data);
          return;
        }
        // Filtros normales
        const params = {};
        if (filtroNombre) {
          params.nombre = filtroNombre;
          params.folio = filtroNombre;
        }
        if (filtroEstado && filtroEstado !== 'finalizada') {
          params.estado = filtroEstado;
        }
        const res = await axios.get("http://localhost:3000/adminBackend/reservations", { params });
        setReservaciones(res.data);
      } catch {
        setError("Error loading reservations");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [filtroNombre, filtroEstado, filtroDiaSemana]);

  
  // Función para actualizar el estado "finalizada" si la fecha ya expiró
  const addFinalizadaStatus = (reservas) => {
    const now = new Date();
    return reservas.map(res => {
      const fechaReserva = new Date(res.fecha);
      // Si la fecha ya pasó y no está cancelada, marcar como finalizada
      if (res.estado !== 'cancelada' && fechaReserva < now) {
        return { ...res, estado: 'finalizada' };
      }
      return res;
    });
  };



  const safeReservaciones = Array.isArray(reservaciones) ? reservaciones : [];
   // Aplica el estado "finalizada" automáticamente
  const reservacionesConEstado = addFinalizadaStatus(safeReservaciones);
  // Filtro adicional en frontend para asegurar búsqueda consistente
  const filtradas = reservacionesConEstado.filter(res => {
    // Normaliza campos para búsqueda
    const folio = (res._id || '').toLowerCase();
    const nombre = (res.nombreCliente || '').toLowerCase();
    const primerApell = (res.primerApell || '').toLowerCase();
    const segundoApell = (res.segundoApell || '').toLowerCase();
    const filtro = filtroNombre.toLowerCase();
    // Coincidencia por folio, nombre o apellidos
    const match =
      folio.includes(filtro) ||
      nombre.includes(filtro) ||
      primerApell.includes(filtro) ||
      segundoApell.includes(filtro);
    // Si hay filtro de estado, también filtra por estado
    const matchEstado = filtroEstado ? res.estado === filtroEstado : true;
    return (!filtroNombre || match) && matchEstado;
  });

  
  // Funciones de utilidad para estilos
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada':
        return 'success';
      case 'cancelada':
        return 'error';
      case 'finalizada':
        return 'secondary'; // Gris para finalizada
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

  // Cancelar reservación vía backend
   const handleCancelReservation = async () => {
    if (!motivo.trim()) return;
    try {
      // 1. Cancela la reservación en el backend
      await axios.patch(`http://localhost:3000/adminBackend/reservations/${selected._id}/cancel`, { motivo });

      // 2. Envía el correo de cancelación usando tu endpoint
      await axios.post("http://localhost:3000/adminBackend/email-reserva/cancel-reservation", {
        toEmail: selected.correoCliente,
        nombreCliente: selected.nombreCliente,
        folio: selected._id,
        fecha: selected.fecha ? new Date(selected.fecha).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
        horaInicio: selected.horaInicio,
        cantidadPersonas: selected.cantidadPersonas,
        motivo: motivo
      });

      setSnackbarOpen(true);
      setOpenDialog(false);

      // Refresca la lista
      const params = {};
      if (filtroNombre) {
        params.nombre = filtroNombre;
        params.folio = filtroNombre;
      }
      if (filtroEstado) {
        params.estado = filtroEstado;
      }
      const res = await axios.get("http://localhost:3000/adminBackend/reservations", { params });
      setReservaciones(res.data);
    } catch {
      setError("Error cancelling reservation");
    }
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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
          {/* Filtro por estado */}
          <FormControl sx={{ maxWidth: 180, minWidth: 180 }}>
            <InputLabel size="small" sx={{ width: 180, backgroundColor: 'white' }}>Filter by Status</InputLabel>
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
              <MenuItem value="finalizada">Finished</MenuItem>
            </Select>
          </FormControl>

          {/* Filtro por nombre o folio */}
          <TextField
            label="Search by Name or Folio"
            variant="outlined"
            size="small"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            sx={{ width: 220, backgroundColor: 'white', borderRadius: 1 }}
          />

    

          {/* Filtro por día de la semana */}
          <FormControl sx={{ maxWidth: 180, minWidth: 180 }}>
            <InputLabel size="small" sx={{ width: 180, backgroundColor: 'white' }}>Day of Week</InputLabel>
            <Select
              labelId="weekday-label"
              id="weekday"
              value={filtroDiaSemana}
              label="Day of Week"
              onChange={e => {
                setFiltroDiaSemana(e.target.value);
              }}
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            >
              <MenuItem value="">All Days</MenuItem>
              <MenuItem value={0}>Sunday</MenuItem>
              <MenuItem value={1}>Monday</MenuItem>
              <MenuItem value={2}>Tuesday</MenuItem>
              <MenuItem value={3}>Wednesday</MenuItem>
              <MenuItem value={4}>Thursday</MenuItem>
              <MenuItem value={5}>Friday</MenuItem>
              <MenuItem value={6}>Saturday</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {/* Estadísticas rápidas */}
        <Box sx={{mb: 3, display: 'flex', gap: 2, justifyContent: "flex-end" }}>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {safeReservaciones.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reservation Count
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {safeReservaciones.filter(r => r.estado === 'confirmada').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmed
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 120 }}>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {safeReservaciones.filter(r => r.estado === 'cancelada').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cancelled
              </Typography>
            </CardContent>
          </Card>

        </Box>
      </Box>



      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">Loading reservations...</Typography>
                    </TableCell>
                  </TableRow>
                ) :
                  filtradas
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
                          Created: {res.fechaReservacion ? new Date(res.fechaReservacion).toISOString().slice(0, 10) : ''}
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
                            {(res.nombreCliente ? res.nombreCliente.charAt(0) : '')}
                            {(res.primerApell ? res.primerApell.charAt(0) : '')}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {res.nombreCliente || ''} {res.primerApell || ''}
                            </Typography>
                            {res.segundoApell && (
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem', fontWeight: 400 }}>
                                {res.segundoApell}
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
                              {res.numTel}
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
                                disabled={res.estado === 'cancelada' || res.estado === 'finalizada'}
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
                {!loading && filtradas.length === 0 && (
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
            <Box sx={{ p: 2, background: '#faf7fb', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="#660152" sx={{ fontWeight: 700, mb: 2 }}>
                Reservation Details
              </Typography>
              <Divider sx={{ mb: 3, borderColor: "#660152", borderWidth: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ReceiptIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Folio</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog._id}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Client</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog.nombreCliente} {ticketDialog.primerApell}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Date</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog.fecha ? new Date(ticketDialog.fecha).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Email</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog.correoCliente}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Phone</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog.numTel}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TimeIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Time</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog.horaInicio}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>People</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog.cantidadPersonas}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventIcon sx={{ color: '#660152', mr: 0.5 }} />
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Status</Typography>
                    </Box>
                    <Chip 
                      label={ticketDialog.estado.toUpperCase()} 
                      color={getStatusColor(ticketDialog.estado)}
                      size="small"
                      sx={{ 
                        fontWeight: 'bold',
                        minWidth: 100,
                        textTransform: 'uppercase',
                        ml: 4,
                        mt: 0.5
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon sx={{ color: '#660152' }} />
                    <Box>
                      <Typography variant="subtitle2" color="#660152" sx={{ fontWeight: 600 }}>Creation Date</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{ticketDialog.fechaReservacion ? new Date(ticketDialog.fechaReservacion).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</Typography>
                    </Box>
                  </Box>
                </Grid>
                
 
              </Grid>
                {ticketDialog.estado === 'cancelada' && ticketDialog.motivoCancel && (
                  <Grid item xs={12}>
                    <Box sx={{ 
                      backgroundColor: '#ffebee', 
                      p: 2, 
                      borderRadius: 1,
                      border: '1px solid #ffcdd2',
                      fullWidth: true,
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CancelIcon sx={{ color: '#d32f2f' }} />
                        <Typography variant="subtitle2" color="#d32f2f" sx={{ fontWeight: 600, textTransform: 'uppercase',  }}>
                          Cancellation Reason
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ ml: 4 }}>
                        {ticketDialog.motivoCancel}
                      </Typography>
                    </Box>
                  </Grid>
                )}
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