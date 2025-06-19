import React from "react";

import { Link, Links } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <div className="text-lg font-semibold">MyBar</div>
      <ul className="flex gap-4">
        <li><Link to="/" className="hover:underline">HOME</Link></li>
        <li><Link to="/menu" className="hover:underline">MENU</Link></li>
        <li><Link to="/events" className="hover:underline">EVENTS</Link></li>
        <li><Link to="/reservations" className="hover:underline">RESERVATIONS</Link></li>
        <li><Link to="/contact" className="hover:underline">CONTACT</Link></li>
        <li><Link to="/login" className="hover:underline">LOG IN</Link></li>
      </ul>
    </nav>
  );
}
