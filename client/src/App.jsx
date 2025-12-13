import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet  } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
// import { useVoiceflow } from './hooks/useVoiceflow';

// Componentes importados de LOGIN
import LoginPage from './pages/loginPage.jsx';
import ProtectedRoute from '../utils/protectedRoute.jsx';

// Componentes importados de CLIENTES
import Navbar from "./pages/clientPages/components/navBar";
import Footer from "./pages/clientPages/components/footer"
import HomePage from './pages/clientPages/homepage.jsx'
import MenuPage from './pages/clientPages/menuPage'
import EventsPage from './pages/clientPages/eventsPage';
import ReservationsPage from './pages/clientPages/reservationPage';
import ContactPage from './pages/clientPages/contactPage'

// Componentes importados de USUARIOS
import MenuUser from "./pages/userPages/menuUser";
import EventsUser from "./pages/userPages/eventsUser.jsx";
import PromoUser from "./pages/userPages/promoUser.jsx";
import ReservationUser from "./pages/userPages/reservationUser.jsx";
import UserLayout from "./layouts/UserLayout.jsx";

// Componentes importados de ADMINISTRADORES
    // import DashboardIoT from "./pages/adminPages/dashboardIoT.jsx";
import EmployesAdmin from "./pages/adminPages/employesAdmin.jsx";
import MenuAdmin from './pages/adminPages/menuAdmin.jsx';
import ReservationAdmin from './pages/adminPages/reservationAdmin.jsx';
import EventsAdmin from './pages/adminPages/eventsAdmin.jsx';
import PromoAdmin from './pages/adminPages/promoAdmin.jsx';
import AdminLayout from "./layouts/AdminLayout.jsx";

// Layouts
function ClientLayout(){
  return(
    <>
  {/* {useVoiceflow()} */}
    <Navbar />
    <Outlet />
    <Footer />
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
            <Route path="/user/home" element={<MenuUser />} />
            <Route path="/user/events" element={<EventsUser />} />
            <Route path="/user/promos" element={<PromoUser />} />
            <Route path="/user/reservations" element={<ReservationUser />} />
          </Route>

          {/* Rutas para admin */}
          <Route element={<ProtectedRoute roleRequired="ADMIN"> <AdminLayout /> </ProtectedRoute>}>
            {/* <Route path="/admin/home" element={<DashboardIoT />} /> */}
            <Route path="/admin/home" element={<MenuAdmin />} />
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
