import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/adminPages/components/sidebar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`transition-all duration-200 ${
          collapsed ? "ml-[80px]" : "ml-[280px]"
        } flex-1 bg-slate-50 min-h-screen`}
      >
        {/* Topbar */}
        <div className="w-full bg-white shadow-md h-16 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-[#660152]">Welcome, Admin</h2>
          {/* Aquí puedes poner avatar, logout, etc. */}
        </div>

        {/* Contenido */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
