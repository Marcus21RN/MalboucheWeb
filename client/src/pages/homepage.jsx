import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold"></div>
        <ul className="flex gap-4">
          <li><button className="hover:underline">HOME</button></li>
          <li><button className="hover:underline">MENU</button></li>
          <li><button className="hover:underline">EVENTS</button></li>
          <li><button className="hover:underline">RESERVATIONS</button></li>
          <li><button className="hover:underline">CONTACT</button></li>
          <li><button className="hover:underline">LOG IN</button></li>
        </ul>
      </nav>

      {/* Hero Banner */}
      <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
        <span className="text-3xl font-bold">[Hero Banner Image]</span>
      </div>

      {/* Menu Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-10">MENU</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Image */}
          <div className="hidden md:block w-full h-64 bg-gray-300"></div>

          {/* Drinks */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">DRINKS</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <button className="text-sm text-blue-600 hover:underline">View menu</button>
          </div>

          {/* Right Image */}
          <div className="hidden md:block w-full h-64 bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-10">
          {/* Left Image */}
          <div className="hidden md:block w-full h-64 bg-gray-300"></div>

          {/* For the Table */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">FOR THE TABLE</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <button className="text-sm text-blue-600 hover:underline">View menu</button>
          </div>

          {/* Right Image */}
          <div className="hidden md:block w-full h-64 bg-gray-300"></div>
        </div>
      </section>
    </div>
  );
}