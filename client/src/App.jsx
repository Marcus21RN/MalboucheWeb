import React from "react";
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Navbar from "./components/navBar";
import HomePage from './pages/homePage';
import MenuPage from './pages/menuPage'
import EventsPage from './pages/eventsPage';
import ReservationsPage from './pages/reservationPage';
import ContactPage from './pages/contactPage'
import LoginPage from './pages/loginPage';

function App() {
  return (
   <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navbar se muestra en todas las páginas */}
        <Navbar />

        {/* Rutas principales */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;