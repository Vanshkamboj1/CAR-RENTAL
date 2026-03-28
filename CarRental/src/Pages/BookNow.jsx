import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCarCard from '../Components/AdminCarCard.jsx';
import LayoutBox from '../Components/LayoutBox.jsx';
import Background from '../assets/Images/Background.png';

const BookNow = () => {
  const [cars, setCars] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars/available`);
        const allCars = response.data;

        const filtered = allCars.filter(
          (car) =>
            !(car.location && car.location.toLowerCase().includes('india'))
        );

        setCars(filtered);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.location?.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <LayoutBox background={Background}>

      {/* Header */}
      <div className="relative mb-10">

        {/* Title Center */}
        <h2 className="text-3xl font-bold text-black text-center">
          Available Cars
        </h2>

        {/* Search Right */}
        <div className="absolute right-0 top-0">
          <input
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 w-64 bg-white/80"
          />
        </div>

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-700 text-lg">Loading cars...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}

      {/* Cars Grid with Scroll */}
      {!loading && !error && (
        <div className="flex justify-center">

          {/* 🔥 Scroll Container */}
          <div className="w-full max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/40 hover:scrollbar-thumb-gray-400/70">

            {/* Padding so scrollbar stays at edge */}
            <div className="px-6">

              <div className="grid grid-cols-3 gap-14">

                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                    <div key={car.id} className="flex justify-center">
                      <AdminCarCard car={car} />
                    </div>
                  ))
                ) : (
                  <p className="col-span-3 text-center text-lg text-gray-700">
                    No cars available
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </LayoutBox>
  );
};

export default BookNow;