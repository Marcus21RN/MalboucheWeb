import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
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
} from "@mui/icons-material";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/home" },
  { text: "Menú", icon: <MenuIcon />, path: "/admin/menu" }, // `RestaurantMenu` da un toque más de "platos"
  { text: "Empleados", icon: <EmployeesIcon />, path: "/admin/employes" },
  { text: "Eventos", icon: <EventsIcon />, path: "/admin/events" },
  { text: "Reservas", icon: <ReservationsIcon />, path: "/admin/reservations" },
  { text: "Promociones", icon: <PromotionsIcon />, path: "/admin/promotions" },
  { text: "Perfil", icon: <ProfileIcon />, path: "/admin/profile" },
];


  const handleItemClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div
      className={`${
        collapsed ? "w-[80px]" : "w-[280px]"
      } h-full bg-white text-[#660152] fixed shadow-xl transition-all duration-300`}
    >
      {/* Toggle/Logo */}
      <div className="flex items-center justify-between p-5 text-xl font-bold">
        {!collapsed && (
          <div className="flex items-center">
            <span className="bg-[#660152] w-8 h-8 rounded-md mr-3"></span>
            Admin Panel
          </div>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuOpenIcon /> : <MenuCollapseIcon />}
        </IconButton>
      </div>

      {/* Menú */}
      <List className="mt-2">
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

      {/* Footer/Configuración */}
      <div className="absolute bottom-0 w-full border-t border-gray-200">
        <Tooltip title={collapsed ? "Configuración" : ""} placement="right">
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleItemClick("/admin/settings")}
              className="!py-3 !px-6"
              selected={activeItem === "/admin/settings"}
              sx={{
                backgroundColor:
                  activeItem === "/admin/settings" ? "#660152" : "inherit",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor:
                    activeItem === "/admin/settings"
                      ? "#660152"
                      : "rgba(247, 210, 240, 0.3)",
                },
              }}
            >
              <ListItemIcon
                className="!min-w-[40px]"
                sx={{
                  color:
                    activeItem === "/admin/settings" ? "white" : "#6b7280",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary="Configuración"
                  primaryTypographyProps={{
                    sx: {
                      color:
                        activeItem === "/admin/settings" ? "white" : "#6b7280",
                      fontWeight:
                        activeItem === "/admin/settings"
                          ? "medium"
                          : "normal",
                    },
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
