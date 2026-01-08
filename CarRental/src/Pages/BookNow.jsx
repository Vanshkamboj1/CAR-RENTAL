import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminCarCard from '../Components/AdminCarCard.jsx';

const BookNow = () => {
  const [cars, setCars] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars/available');
        const allCars = response.data;

        // ❌ Exclude cars whose location contains "india" (case-insensitive)
        const filtered = allCars.filter(
          (car) =>
            !(car.location && car.location.toLowerCase().includes('india'))
        );

        setCars(filtered);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ✅ Allow search (based on remaining cars)
  const filteredCars = cars.filter((car) =>
    car.location?.toLowerCase().includes(searchLocation.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;
  }

  return (
    <div className="mt-18 flex flex-col pl-14 bg-gray-500/50">
      <div className="flex flex-col w-full mb-5">
        <h2 className="text-2xl font-bold text-center mt-5">Available Cars</h2>

        {/* Search bar */}
        <div className="flex justify-end mt-4 mb-5">
          <input
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="p-2 rounded border border-gray-400 focus:outline-none w-64"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="w-[22%] min-w-[250px]">
                <AdminCarCard car={car} />
              </div>
            ))
          ) : (
            <p className="text-center w-full text-xl mt-5">
              No cars available for this location
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookNow;
