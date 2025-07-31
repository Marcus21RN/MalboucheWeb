import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet  } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
{/*  import { useVoiceflow } from './hooks/useVoiceflow'; */} // COMENTADO PARA EVITAR DESPERDICIOS DE CRÉDITOS

// Componentes importados de LOGIN
import LoginPage from './pages/loginPage.jsx';
import ProtectedRoute from '../utils/protectedRoute.jsx';

// Componentes importados de CLIENTES
import Navbar from "./pages/clientPages/components/navBar";
import Footer from "./pages/clientPages/components/footer"
import HomePage from './pages/clientPages/homePage.jsx'
import MenuPage from './pages/clientPages/menuPage'
import EventsPage from './pages/clientPages/eventsPage';
import ReservationsPage from './pages/clientPages/reservationPage';
import ContactPage from './pages/clientPages/contactPage'

// Componentes importados de USUARIOS
import HomeUser from "./pages/userPages/homeUser";
import PromoUser from './pages/userPages/promoUser.jsx';
import MenusUser from './pages/userPages/menu.jsx';

// Componentes importados de ADMINISTRADORES
import EmployesAdmin from "./pages/adminPages/employesAdmin.jsx";
import DashboardIoT from "./pages/adminPages/dashboardIoT.jsx";
import MenuAdmin from './pages/adminPages/menuAdmin.jsx';
import ReservationAdmin from './pages/adminPages/reservationAdmin.jsx';
import EventsAdmin from './pages/adminPages/eventsAdmin.jsx';
import PromoAdmin from './pages/adminPages/promoAdmin.jsx';
import AdminLayout from "./layouts/AdminLayout";

// Layouts
function ClientLayout(){
  return(
    <>
   {/* {useVoiceflow()}  // COMENTADO PARA EVITAR DESPERDICIOS DE CRÉDITOS */} 
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

          {/* Rutas para login */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rutas para usuarios */}
          <Route element={<ProtectedRoute roleRequired="EMPLE"> <UserLayout /> </ProtectedRoute>}>
            <Route path="/user/home" element={<HomeUser />} />
            <Route path="/user/promotions" element={<PromoUser />} />
            <Route path="/user/menus" element={<MenusUser />} />
          </Route>

          {/* Rutas para admin */}
          <Route element={<ProtectedRoute roleRequired="ADMIN"> <AdminLayout /> </ProtectedRoute>}>
            <Route path="/admin/home" element={<DashboardIoT />} />
            <Route path="/admin/menu" element={<MenuAdmin />} />
            <Route path="/admin/events" element={<EventsAdmin />} />
            <Route path="/admin/reservations" element={<ReservationAdmin />} />
            <Route path="/admin/employes" element={<EmployesAdmin />} />
            <Route path="/admin/promos" element={<PromoAdmin />} />
          </Route>
        </Routes>
      </Router>
    </ParallaxProvider>
  );
}



export default App;
