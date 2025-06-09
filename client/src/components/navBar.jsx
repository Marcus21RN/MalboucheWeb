import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo o nombre de la app */}
      <div className="text-lg font-semibold">MyApp</div>

      {/* Enlaces del menú */}
      <ul className="flex gap-4">
        <li><button className="hover:underline">HOME</button></li>
        <li><button className="hover:underline">MENU</button></li>
        <li><button className="hover:underline">EVENTS</button></li>
        <li><button className="hover:underline">RESERVATIONS</button></li>
        <li><button className="hover:underline">CONTACT</button></li>
        <li><button className="hover:underline">LOG IN</button></li>
      </ul>
    </nav>
  );
}