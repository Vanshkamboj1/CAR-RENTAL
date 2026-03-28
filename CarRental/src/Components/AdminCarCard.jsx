import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCarCard({ car }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/user/booking/${car.id}`, { state: { car } });
  };

  return (
    <div className="bg-gray-200/40 backdrop-blur-md rounded-xl shadow-lg p-4 w-64 flex flex-col items-center 
                    transform transition-transform duration-300 hover:scale-105">

      {/* Image Section */}
      <div className="relative w-full">
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