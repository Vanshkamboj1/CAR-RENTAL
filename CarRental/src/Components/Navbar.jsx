import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session or local storage data if needed
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-600 p-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="WheelX Logo" className="w-20 h-10" />
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">WheelX</h1>
        </div>

        {/* Center Buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          <Link
            to="/user"
            className="text-white hover:text-gray-300 text-lg transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/user/booknow"
            className="text-white hover:text-gray-300 text-lg transition-colors duration-200"
          >
            Book Now
          </Link>
          
          <Link
            to="/user/about"
            className="text-white hover:text-gray-300 text-lg transition-colors duration-200"
          >
            About Us
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
