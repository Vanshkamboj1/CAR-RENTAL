import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Images/logo.png';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white p-4 shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2">

        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="WheelX Logo" className="w-20 h-10" />
          <h1 className="text-2xl font-bold text-black">WheelX</h1>
        </div>

        {/* Center Buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">

          <Link
            to="/admin"
            className="px-4 py-2 bg-white text-black rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
          >
            Home
          </Link>

          <Link
            to="/admin/bookings"
            className="px-4 py-2 bg-white text-black rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
          >
            Bookings
          </Link>

          <Link
            to="/admin/makeavailable"
            className="px-4 py-2 bg-white text-black rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
          >
            Manage
          </Link>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;