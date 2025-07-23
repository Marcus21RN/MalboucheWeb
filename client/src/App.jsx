import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet  } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';


// Componentes importados de CLIENTES
import Navbar from "./pages/clientPages/components/navBar";
import Footer from "./pages/clientPages/components/footer"
import HomePage from './pages/clientPages/homePage';
import MenuPage from './pages/clientPages/menuPage'
import EventsPage from './pages/clientPages/eventsPage';
import ReservationsPage from './pages/clientPages/reservationPage';
import ContactPage from './pages/clientPages/contactPage'

// Componentes importados de USUARIOS
import LoginPage from './pages/userPages/loginPage';
import HomeUser from "./pages/userPages/homeUser";
import PromoUser from './pages/userPages/promoUser.jsx';
import MenusUser from './pages/userPages/menu.jsx';

// Componentes importados de ADMINISTRADORES
import HomeAdmin from "./pages/adminPages/homeAdmin";
import EmpleadoAdmin from "./pages/adminPages/empleadoAdmin.jsx";
import DashboardIoT from "./pages/adminPages/dashboardIoT.jsx";

// Layouts
function ClientLayout(){
  return(
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  );
}

function UserLayout(){
  return(
    <>
    <Outlet/>
    </>
  );
}

function AdminLayout(){
  return(
    <>
    <Outlet/>
    </>
  );
}

function App() {
  return (
    <ParallaxProvider>
      <Router>
        <Routes>
          {/* Rutas para clientes */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Rutas para usuarios */}
          <Route element={<UserLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/home" element={<HomeUser />} />
            <Route path="/user/promotions" element={<PromoUser />} />
            <Route path="/user/menus" element={<MenusUser />} />
          </Route>

          {/* Rutas para admin */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="/admin/empleados" element={<EmpleadoAdmin />} />
            <Route path="/admin/iot" element={<DashboardIoT />} />
          </Route>
        </Routes>
      </Router>
    </ParallaxProvider>
  );
}



export default App;