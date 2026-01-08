import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCarCard({ car }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/user/booking/${car.id}`, { state: { car } });
  };

  return (
    <div className="bg-[#f7eecd] rounded-xl shadow-lg p-4 w-64 flex flex-col items-center 
                    transform transition-transform duration-300 hover:scale-105 mb-15">
      
      <div className="relative w-full">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-40 object-contain mb-3"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {car.location}
        </div>
      </div>

      <h3 className="text-lg font-bold text-center">{car.name}</h3>
      <p className="text-gray-600 font-semibold text-sm">{car.price}</p>

      <button
        onClick={handleBookNow}
        className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-bold transition"
      >
        Book Now
      </button>
    </div>
  );
}

export default AdminCarCard;
