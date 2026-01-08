import React from 'react';
import { useNavigate } from 'react-router-dom';

function CarCard({ car }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/user/booking/${car.id}`, { state: { car } });
  };

  return (
    <div className="bg-[#f7eecd] rounded-xl shadow-lg p-4 w-64 flex flex-col items-center 
                    transform transition-transform duration-300 hover:scale-105 -mt-10">
      <img 
        src={car.imageUrl} 
        alt={car.name} 
        className="w-full h-40 object-contain mb-4" 
      />
      <h3 className="text-lg font-bold text-center">{car.name}</h3>
      <p className="text-gray-600">{car.price}</p>
      <button
        onClick={handleBookNow}
        className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition"
      >
        Book Now
      </button>
    </div>
  );
}

export default CarCard;
