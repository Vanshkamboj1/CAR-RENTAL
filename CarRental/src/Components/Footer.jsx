import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo / Brand */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold text-white">WheelX</h1>
          <p className="text-sm text-white">Premium Car Rentals Across India</p>
        </div>

        {/* Links */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="#cars" className="text-white hover:text-gray-200 text-sm">Cars</a>
          <a href="#about" className="text-white hover:text-gray-200 text-sm">About Us</a>
          <a href="#contact" className="text-white hover:text-gray-200 text-sm">Contact</a>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-white text-center md:text-right">
          <p>Email: support@wheelx.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-white text-xs mt-4">
        &copy; {new Date().getFullYear()} WheelX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
