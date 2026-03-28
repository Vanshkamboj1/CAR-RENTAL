import React from 'react';

function Footer() {
  return (
    <footer className="bg-white text-black py-6 shadow-inner border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-xl font-bold">WheelX</h1>
          <p className="text-sm text-gray-600">Premium Car Rentals Across India</p>
        </div>

        <div className="flex gap-4 mb-4 md:mb-0">
          <a
            href="#cars"
            className="px-3 py-1 rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all duration-200 text-sm"
          >
            Cars
          </a>

          <a
            href="#about"
            className="px-3 py-1 rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all duration-200 text-sm"
          >
            About Us
          </a>

          <a
            href="#contact"
            className="px-3 py-1 rounded-md shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all duration-200 text-sm"
          >
            Contact
          </a>
        </div>

        <div className="text-sm text-gray-700 text-center md:text-right">
          <p>Email: support@wheelx.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-4">
        &copy; {new Date().getFullYear()} WheelX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;