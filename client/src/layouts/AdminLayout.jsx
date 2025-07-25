import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/adminPages/components/sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-[280px] bg-slate-50 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;