import React, { useState, useEffect } from 'react';
import Background from '../assets/images/Background.png';
import AdminCarCard from '../Components/AdminCarCard.jsx';

function LandingPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const initialCars = 4; // show 4 cars at a time
  const slideStep = 2;   // slide 2 cars per click

  // ✅ Fetch cars and filter properly
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cars/available');
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }

        const data = await response.json();

        // ✅ Clean filter (case-insensitive, trims spaces, checks exact word)
        const filteredCars = data.filter((car) => {
          const location = (car.location || '').toLowerCase().trim();
          return location === 'india' || location.includes(' india');
        });

        setCars(filteredCars);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ✅ Slider logic
  const next = () => {
    if (currentIndex + slideStep < cars.length) {
      setCurrentIndex(currentIndex + slideStep);
    }
  };

  const prev = () => {
    if (currentIndex - slideStep >= 0) {
      setCurrentIndex(currentIndex - slideStep);
    }
  };

  // ✅ Visible cars
  const visibleCars = cars.slice(currentIndex, currentIndex + initialCars);

  const componentStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
  };

  return (
    <div style={componentStyle} className="py-8 mt-10">
      <div className="p-6">
        {/* Slogan Section */}
        <div className="p-3 rounded-xl mx-auto mb-4">
          <h1 className="text-4xl font-semibold text-black/60 text-center drop-shadow-md leading-snug">
            Experience the Road Like Never Before – Premium Cars, Seamless Booking, and Unmatched Comfort at Your Fingertips.
          </h1>
        </div>

        {/* Title */}
        <h4 className="text-3xl font-bold text-center mb-1 text-black/60 mt-20">
          Cars Available in India
        </h4>
        <p className="text-sm text-center text-black mb-4 drop-shadow-md">
          Only showing cars located in India. Book at least 1 week in advance for guaranteed availability.
        </p>

        {/* Loading / Error */}
        {loading && <p className="text-center text-gray-700">Loading cars...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Slider Buttons */}
        {!loading && !error && cars.length > initialCars && (
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`p-2 rounded ${
                currentIndex === 0
                  ? 'bg-[#FFF8DC] cursor-not-allowed'
                  : 'bg-[#FFF8DC] hover:bg-gray-200'
              }`}
            >
              &#8592;
            </button>
            <button
              onClick={next}
              disabled={currentIndex + initialCars >= cars.length}
              className={`p-2 rounded ${
                currentIndex + initialCars >= cars.length
                  ? 'bg-[#FFF8DC] cursor-not-allowed'
                  : 'bg-[#FFF8DC] hover:bg-gray-200'
              }`}
            >
              &#8594;
            </button>
          </div>
        )}

        {/* Car Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {!loading &&
            !error &&
            visibleCars.map((car) => (
              <AdminCarCard key={car.id} car={car} className="w-48" />
            ))}
        </div>

        {/* No Cars Found */}
        {!loading && !error && cars.length === 0 && (
          <p className="text-center text-gray-600">
            No cars available in India right now.
          </p>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
