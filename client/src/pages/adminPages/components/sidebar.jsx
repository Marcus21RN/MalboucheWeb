import React, { useState } from "react";
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

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [profileExpanded, setProfileExpanded] = useState(false);

  // Información del usuario logueado (puedes obtenerla del contexto, localStorage, etc.)
  const [userInfo] = useState({
    _id: "ADMIN001",
    nombre: "Diana",
    primerApellido: "Rodríguez",
    segundoApellido: "García",
    correo: "diana.admin@malbouche.com",
    IDRol: "ADMIN",
    estado: "activo"
  });

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/home" },
    { text: "Menu", icon: <MenuIcon />, path: "/admin/menu" },
    { text: "Employees", icon: <EmployeesIcon />, path: "/admin/employes" },
    { text: "Events", icon: <EventsIcon />, path: "/admin/events" },
    { text: "Reservations", icon: <ReservationsIcon />, path: "/admin/reservations" },
    { text: "Promos", icon: <PromotionsIcon />, path: "/admin/promos" },
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
    setActiveItem("/admin/profile");
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
        return "Administrador";
      case "EMPLE":
        return "Empleado";
      default:
        return "Usuario";
    }
  };

  const getStatusColor = (estado) => {
    return estado === "activo" ? "success" : "error";
  };

  return (
    <div
      className={`bg-white text-[#660152] h-screen transition-all duration-300 ease-in-out ${
        collapsed ? "w-[80px]" : "w-[280px]"
      } fixed left-0 top-0 overflow-hidden z-50 flex flex-col`}
    >
      {/* Toggle/Logo */}
      <div className="flex items-center justify-between p-5 text-xl font-bold">
        {!collapsed && (
          <div className="flex items-center">
            <span className="bg-[#660152] w-8 h-8 rounded-md mr-3"></span>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold',
                color: '#660152'
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
                      activeItem === item.path ? "#660152" : "inherit",
                    borderRadius: "10px",
                    "&:hover": activeItem === item.path
                      ? {}
                      : {
                          backgroundColor: "rgba(247, 210, 240, 0.3)",
                          borderRadius: "10px",
                          "& .MuiListItemIcon-root": {
                            color: "#660152",
                          },
                          "& .MuiTypography-root": {
                            color: "#660152",
                            fontWeight: "medium",
                            fontFamily: 'Montserrat, sans-serif',
                          },
                        },
                    "&.Mui-selected": {
                      backgroundColor: "#660152",
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                      "& .MuiTypography-root": {
                        color: "white",
                        fontWeight: "medium",
                        fontFamily: 'Montserrat, sans-serif',
                      },
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#660152",
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
                          fontFamily: 'Montserrat, sans-serif',
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
      <div className="border-t border-gray-200">
        <Tooltip title={collapsed ? "Profile" : ""} placement="right">
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleProfileClick}
              className="!py-3 !px-6"
              selected={activeItem === "/admin/profile"}
              sx={{
                backgroundColor:
                  activeItem === "/admin/profile" ? "#660152" : "inherit",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor:
                    activeItem === "/admin/profile"
                      ? "#660152"
                      : "rgba(247, 210, 240, 0.3)",
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
                    backgroundColor: activeItem === "/admin/profile" ? "white" : "#660152",
                    color: activeItem === "/admin/profile" ? "#660152" : "white",
                    fontSize: "0.9rem",
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold'
                  }}
                >
                  {userInfo.nombre.charAt(0)}{userInfo.primerApellido.charAt(0)}
                </Avatar>
              </ListItemIcon>
              {!collapsed && (
                <>
                  <ListItemText
                    primary="Profile"
                    primaryTypographyProps={{
                      sx: {
                        color:
                          activeItem === "/admin/profile" ? "white" : "#6b7280",
                        fontWeight:
                          activeItem === "/admin/profile"
                            ? "medium"
                            : "normal",
                        fontFamily: 'Montserrat, sans-serif',
                      },
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      color: activeItem === "/admin/profile" ? "white" : "#6b7280",
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
          <Box sx={{ px: 2, pb: 2, backgroundColor: 'rgba(102, 1, 82, 0.05)' }}>
            <Divider sx={{ mb: 2 }} />
            
            {/* Avatar y nombre principal */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#660152",
                  color: "white",
                  fontSize: "1.1rem",
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                  mr: 2
                }}
              >
                {userInfo.nombre.charAt(0)}{userInfo.primerApellido.charAt(0)}
              </Avatar>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                    color: '#660152',
                    lineHeight: 1.2
                  }}
                >
                  {userInfo.nombre} {userInfo.primerApellido}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'Montserrat, sans-serif',
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
                    fontFamily: 'Montserrat, sans-serif',
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
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#6b7280',
                    fontSize: '0.75rem'
                  }}
                >
                  ID: {userInfo._id}
                </Typography>
              </Box>

              {/* Rol y Estado */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Chip
                  icon={getRoleIcon(userInfo.IDRol)}
                  label={getRoleLabel(userInfo.IDRol)}
                  size="small"
                  sx={{
                    backgroundColor: "#660152",
                    color: "white",
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'medium',
                    fontSize: '0.7rem',
                    "& .MuiChip-icon": {
                      color: "white",
                      fontSize: 14
                    }
                  }}
                />
                <Chip
                  label={userInfo.estado.toUpperCase()}
                  size="small"
                  color={getStatusColor(userInfo.estado)}
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Collapse>
      </div>
    </div>
  );
};

export default Sidebar;