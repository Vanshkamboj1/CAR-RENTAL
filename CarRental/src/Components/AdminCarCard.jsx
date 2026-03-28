import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCarCard({ car }) {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  const handleBookNow = () => {
    navigate(`/user/booking/${car.id}`, { state: { car } });
  };

  return (
    <div className="relative bg-gray-200/40 backdrop-blur-md rounded-xl shadow-lg p-4 w-64 flex flex-col items-center 
                    transform transition-transform duration-300 hover:scale-105">

      {/* Info Icon & Tooltip */}
      <div 
        className="absolute top-2 right-2 w-7 h-7 bg-white/90 border border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 cursor-pointer hover:bg-white z-10 shadow-md transition-colors"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        i
      </div>

      {showInfo && (
        <div className="absolute top-10 right-2 w-52 bg-white flex flex-col gap-1 shadow-2xl rounded-xl p-3 text-xs text-gray-800 z-20 border border-gray-200 animate-fade-in">
          {car.registrationNumber && <p><strong>Reg:</strong> {car.registrationNumber}</p>}
          {car.seatingCapacity && <p><strong>Seats:</strong> {car.seatingCapacity}</p>}
          {car.bootSpace && <p><strong>Boot Space:</strong> {car.bootSpace}</p>}
          {car.fuelEfficiency && <p><strong>Fuel:</strong> {car.fuelEfficiency}</p>}
          {car.drivePreferences && <p><strong>Drive:</strong> {car.drivePreferences}</p>}
          {car.modelYear && <p><strong>Model Year:</strong> {car.modelYear}</p>}
          {(!car.registrationNumber && !car.seatingCapacity) && <p className="text-gray-500 italic">No extra info available</p>}
        </div>
      )}

      {/* Image Section */}
      <div className="relative w-full mt-2">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-40 object-contain mb-3"
        />

        {/* Location Badge */}
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {car.location}
        </div>
      </div>

      {/* Name Box */}
      <div className="bg-white/80 shadow-md px-4 py-1 rounded-lg mb-2">
        <h3 className="text-md font-bold text-center text-gray-800">
          {car.name}
        </h3>
      </div>

      {/* Price Box */}
      <div className="bg-white/70 shadow-sm px-3 py-1 rounded-lg mb-3">
        <p className="text-gray-700 font-semibold text-sm">
          ₹{car.price}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleBookNow}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-bold transition"
      >
        Book Now
      </button>
    </div>
  );
}

export default AdminCarCard;