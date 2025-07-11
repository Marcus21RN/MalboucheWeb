import React from "react";
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Navbar from "./components/navBar";
import Footer from "./components/footer"
import HomePage from './pages/clientPages/homePage';
import MenuPage from './pages/clientPages/menuPage'
import EventsPage from './pages/clientPages/eventsPage';
import ReservationsPage from './pages/clientPages/reservationPage';
import ContactPage from './pages/clientPages/contactPage'
import LoginPage from './pages/userPages/loginPage';

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
        <Footer />
      </div>
    </Router>

  );
}

export default App;