import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Collapse,
  Typography,
  Divider,
  Box,
  Avatar,
  Chip,
  Dialog,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Insights as DashboardIcon,
  RestaurantMenu as MenuIcon,
  People as EmployeesIcon,
  Event as EventsIcon,
  BookOnline as ReservationsIcon,
  LocalOffer as PromotionsIcon,
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuCollapseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AdminPanelSettings as AdminIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import logo from "../../../assets/imagenes/MalboucheLogo.png";

const SidebarU = ({ collapsed, setCollapsed }) => {
  // Configurar interceptor para token solo una vez
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // Cleanup para evitar múltiples interceptores
    return () => axios.interceptors.request.eject(interceptor);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [profileExpanded, setProfileExpanded] = useState(false);

  // Información del usuario logueado desde localStorage
  const [userInfo, setUserInfo] = useState({
    _id: "",
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    IDRol: "",
    estado: ""
  });

  useEffect(() => {
    // 1. Intentar obtener userAuth de localStorage
    const userData = localStorage.getItem('userAuth');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        // Forzar _id a número si existe
        if (parsed._id) parsed._id = Number(parsed._id);
        setUserInfo(parsed);
        return;
      } catch {
        // Si hay error, continuar para intentar con el token
      }
    }
    // 2. Si no hay userAuth, intentar obtener correo del token y consultar backend
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const correo = decoded.correo || decoded.email || decoded.user || decoded.username;
        if (correo) {
          axios.get(`http://localhost:3000/authJWT/auth/userinfo?correo=${encodeURIComponent(correo)}`)
            .then(res => {
              // Si la respuesta tiene id pero no _id, mapea id a _id
              const userData = res.data;
              if (userData.id && !userData._id) {
                userData._id = userData.id;
              }
              // Forzar _id a número si existe
              if (userData._id) userData._id = Number(userData._id);
              setUserInfo(userData);
              localStorage.setItem('userAuth', JSON.stringify(userData));
            })
            .catch(() => {});
        }
      } catch {
        // Si hay error, no hacer nada
      }
    }
  }, []);

  // Modal para cambiar contraseña
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const menuItems = [
    // { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/home" },
    { text: "Menu", icon: <MenuIcon />, path: "/user/home" },
    { text: "Events", icon: <EventsIcon />, path: "/user/events" },
    { text: "Reservations", icon: <ReservationsIcon />, path: "/user/reservations" },
    { text: "Promos", icon: <PromotionsIcon />, path: "/user/promos" },
  ];

  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const handleProfileClick = () => {
    if (collapsed) {
      setCollapsed(false);
    }
    setProfileExpanded(!profileExpanded);
    setActiveItem("/user/profile");
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "ADMIN":
        return <AdminIcon />;
      case "EMPLE":
        return <WorkIcon />;
      default:
        return <ProfileIcon />;
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "ADMIN":
        return "Administrator";
      case "EMPLE":
        return "Employee";
      default:
        return "User";
    }
  };

  const getStatusColor = (estado) => {
    return estado === "activo" ? "success" : "error";
  };

  return (
    <div
      className={`bg-white text-[#1A1A1A] h-screen transition-all duration-300 ease-in-out ${
        collapsed ? "w-[80px]" : "w-[280px]"
      } fixed left-0 top-0 overflow-hidden z-50 flex flex-col`}
    >
      {/* Toggle/Logo */}
      <div className="flex items-center justify-between p-5 text-xl font-bold">
        {!collapsed && (
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-md mr-2" />

            <Typography
              variant="h6"
              sx={{
                fontFamily: 'combo, sans-serif',
                fontWeight: 'bold',
                color: '#1A1A1A'
              }}
            >
              Admin Panel
            </Typography>
          </div>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuOpenIcon /> : <MenuCollapseIcon />}
        </IconButton>
      </div>
      {/* Divider */}
      <Divider sx={{ backgroundColor: "#f5f5f5", width: "90%", margin: "0 auto" }} />

      {/* Menú Principal */}
      <List className="mt-2 flex-1">
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <div className="w-full px-5 pb-1">
              <Tooltip title={collapsed ? item.text : ""} placement="right">
                <ListItemButton
                  onClick={() => handleItemClick(item.path)}
                  className="!py-2 !px-2 gap-1"
                  selected={activeItem === item.path}
                  sx={{
                    backgroundColor:
                      activeItem === item.path ? "#1A1A1A" : "inherit",
                    borderRadius: "10px",
                    "&:hover": activeItem === item.path
                      ? {}
                      : {
                          backgroundColor: "rgba(246, 212, 0, 0.12)",
                          borderRadius: "10px",
                          "& .MuiListItemIcon-root": {
                            color: "#1A1A1A",
                          },
                          "& .MuiTypography-root": {
                            color: "#1A1A1A",
                            fontWeight: "medium",
                            fontFamily: 'combo, sans-serif',
                          },
                        },
                    "&.Mui-selected": {
                      backgroundColor: "#F6D400",
                      "& .MuiListItemIcon-root": {
                        color: "black",
                      },
                      "& .MuiTypography-root": {
                        color: "black",
                        fontWeight: "medium",
                        fontFamily: 'combo, sans-serif',
                      },
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#F6D400",
                    },
                  }}
                >
                  <ListItemIcon
                    className="!min-w-[40px]"
                    sx={{
                      color: activeItem === item.path ? "white" : "#6b7280",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        sx: {
                          color:
                            activeItem === item.path ? "white" : "#6b7280",
                          fontWeight:
                            activeItem === item.path ? "medium" : "normal",
                          fontFamily: 'combo, sans-serif',
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </div>
          </ListItem>
        ))}
      </List>

      {/* Sección de Profile */}
      <div className="">
        <Tooltip title={collapsed ? "Profile" : ""} placement="right" >
          <ListItem disablePadding >
            <ListItemButton
              onClick={handleProfileClick}
              className="!py-3 !px-6"
              selected={activeItem === "/admin/profile"}
              sx={{
                backgroundColor:
                  activeItem === "/admin/profile" ? "rgba(26,26,26,0.8)" : "rgba(246, 212, 0, 0.06)",
                "&:hover": {
                  backgroundColor:
                    activeItem === "/admin/profile"
                      ? "rgba(26,26,26,0.8)"
                      : "rgba(246, 212, 0, 0.06)",
                },
              }}
            >
              <ListItemIcon
                className="!min-w-[40px]"
                sx={{
                  color:
                    activeItem === "/admin/profile" ? "white" : "#6b7280",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: activeItem === "/admin/profile" ? "white" : "#1A1A1A",
                    color: activeItem === "/admin/profile" ? "#1A1A1A" : "white",
                    fontSize: "0.9rem",
                    fontFamily: 'combo, sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  {(userInfo.nombre ? userInfo.nombre.charAt(0) : "U")}{(userInfo.primerApellido ? userInfo.primerApellido.charAt(0) : "")}
                </Avatar>
              </ListItemIcon>
              {!collapsed && (
                <>
                  <ListItemText
                    primary="Profile"
                    primaryTypographyProps={{
                        sx: {
                        color:
                          activeItem === "/admin/profile" ? "#1A1A1A" : "#6b7280",
                        fontWeight:
                          activeItem === "/admin/profile"
                            ? "medium"
                            : "normal",
                        fontFamily: 'combo, sans-serif',
                      },
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      color: activeItem === "/admin/profile" ? "#1A1A1A" : "#6b7280",
                    }}
                  >
                    {profileExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </>
              )}
            </ListItemButton>
          </ListItem>
        </Tooltip>

        {/* Información del usuario expandida */}
        <Collapse in={profileExpanded && !collapsed}>
          <Box sx={{ px: 2, pb: 2, backgroundColor: 'rgba(246, 212, 0, 0.06)' }}>
            <Divider sx={{ mb: 2 }} />
            
            {/* Avatar y nombre principal */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#1A1A1A",
                  color: "white",
                  fontSize: "1.1rem",
                  fontFamily: 'combo, sans-serif',
                  fontWeight: 'bold',
                  mr: 2
                }}
              >
                {(userInfo.nombre ? userInfo.nombre.charAt(0) : "U")}{(userInfo.primerApellido ? userInfo.primerApellido.charAt(0) : "")}
              </Avatar>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: 'combo, sans-serif',
                    fontWeight: 'bold',
                    color: '#1A1A1A',
                    lineHeight: 1.2
                  }}
                >
                  {userInfo.nombre} {userInfo.primerApellido}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'combo, sans-serif',
                    color: '#6b7280',
                    fontSize: '0.75rem'
                  }}
                >
                  {userInfo.segundoApellido}
                </Typography>
              </Box>
            </Box>

            {/* Información detallada */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'combo, sans-serif',
                    color: '#6b7280',
                    fontSize: '0.75rem'
                  }}
                >
                  {userInfo.correo}
                </Typography>
              </Box>

              {/* ID */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BadgeIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'combo, sans-serif',
                    color: '#6b7280',
                    fontSize: '0.75rem'
                  }}
                >
                  ID: {userInfo._id || userInfo.id || "Not available"}
                </Typography>
              </Box>

              {/* Rol y Estado */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Chip
                  icon={getRoleIcon(userInfo.IDRol)}
                  label={getRoleLabel(userInfo.IDRol)}
                  size="small"
                  sx={{
                    backgroundColor: "#1A1A1A",
                    color: "white",
                    fontFamily: 'combo, sans-serif',
                    fontWeight: 'medium',
                    fontSize: '0.7rem',
                    "& .MuiChip-icon": {
                      color: "white",
                      fontSize: 14
                    }
                  }}
                />
                <Chip
                  label={userInfo.estado === "activo" ? "Active" : userInfo.estado === "inactivo" ? "Inactive" : (userInfo.estado || "Unknown").toUpperCase()}
                  size="small"
                  color={getStatusColor(userInfo.estado)}
                  sx={{
                    fontFamily: 'combo, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }}
                />
              </Box>

              {/* Cambiar contraseña */}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Chip
                  label="Change Password"
                  
                  variant="outlined"
                  onClick={() => setOpenPasswordModal(true)}
                  sx={{ fontFamily: 'combo, sans-serif', fontWeight: 'bold', cursor: 'pointer', borderColor: '#1A1A1A', color: '#1A1A1A', '&:hover': { backgroundColor: 'rgba(246, 212, 0, 0.06)' } }}
                />
              </Box>
            </Box>
            {/* Modal Cambiar Contraseña */}
            <Dialog open={openPasswordModal} onClose={() => {
              setOpenPasswordModal(false);
              setCurrentPassword("");
              setNewPassword("");
              setPasswordError("");
              setPasswordSuccess("");
            }}>
              <Box sx={{ p: 3, minWidth: 350 }}>
                <Typography variant="h6" fontWeight="bold" color="#1A1A1A" mb={2}>
                  Change Password
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
                  />
                  {passwordError && <Typography color="error">{passwordError}</Typography>}
                  {passwordSuccess && <Typography color="success.main">{passwordSuccess}</Typography>}
                  <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => {
                        setOpenPasswordModal(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setPasswordError("");
                        setPasswordSuccess("");
                      }}
                      style={{ padding: '8px 18px', borderRadius: 6, border: '1px solid #1A1A1A', background: 'white', color: '#1A1A1A', fontWeight: 'bold', cursor: 'pointer' }}
                      disabled={passwordLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        setPasswordError("");
                        setPasswordSuccess("");
                        if (!currentPassword || !newPassword) {
                          setPasswordError("Completa ambos campos.");
                          return;
                        }
                        setPasswordLoading(true);
                        try {
                          // PUT al backend para cambiar contraseña
                          // Validar que userInfo._id esté presente y sea número
                          if (!userInfo._id || isNaN(userInfo._id)) {
                            setPasswordError('No se encontró el ID del usuario. Intenta recargar la página.');
                            setPasswordLoading(false);
                            return;
                          }
                          await axios.put(
                            `http://localhost:3000/adminBackend/empleados/${userInfo._id}`,
                            {
                              password: newPassword,
                              confirmPassword: currentPassword
                            }
                          );
                          setPasswordSuccess("Password changed successfully.");
                          setCurrentPassword("");
                          setNewPassword("");
                        } catch (err) {
                          setPasswordError(
                            err?.response?.data?.error || "Error changing password."
                          );
                        } finally {
                          setPasswordLoading(false);
                        }
                      }}
                      style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: '#F6D400', color: '#1A1A1A', fontWeight: 'bold', cursor: 'pointer' }}
                      disabled={passwordLoading}
                    >
                      Save
                    </button>
                  </Box>
                </Box>
              </Box>
            </Dialog>
          </Box>
        </Collapse>
      </div>
    </div>
  );
};

export default SidebarU;