import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import UserSidebar from "../pages/userPages/components/sidebarU.jsx";
import LogoutButton from "../pages/userPages/components/logout.jsx";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Obtener nombre de usuario desde el token
  let userName = "User";
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userName = decoded.nombre || "User";
    }
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    // Si hay error, dejar el valor por defecto
  }

  return (
    <div className="flex min-h-screen">
      <UserSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`transition-all duration-200 ${
          collapsed ? "ml-[80px]" : "ml-[280px]"
        } flex-1 bg-slate-50 min-h-screen`}
      >
        {/* Topbar */}
        <div className="w-full bg-white h-20 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-[#1A1A1A] font-['combo']">
            Welcome, {userName}
          </h2>
          {/* Aquí puedes poner avatar, logout, etc. */}
          <LogoutButton />
        </div>

        {/* Contenido */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
