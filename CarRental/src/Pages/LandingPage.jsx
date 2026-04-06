import React, { useState, useEffect } from 'react';
import Background from '../assets/Images/Background.png';
import AdminCarCard from '../Components/AdminCarCard.jsx';
import LayoutBox from '../Components/LayoutBox.jsx';

function LandingPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const initialCars = 4;
  const slideStep = 2;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cars/available`);
        if (!response.ok) throw new Error('Failed to fetch cars');

        const data = await response.json();

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

  const visibleCars = cars.slice(currentIndex, currentIndex + initialCars);

  return (
    <LayoutBox background={Background}>
      
      {/* Wrapper */}
      <div className="space-y-6">

        {/* 🔥 Slogan Box */}
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl">
          <h1 className="text-2xl md:text-3xl font-semibold text-black/80 text-center leading-snug">
            Experience the Road Like Never Before – Premium Cars, Seamless Booking,
            and Unmatched Comfort at Your Fingertips.
          </h1>
        </div>

        {/* 🔥 Title Box */}
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center">
          <h4 className="text-2xl font-bold text-black/80 mb-2">
            Cars Available Throughout India
          </h4>
          <p className="text-sm text-gray-600">
            Book at least 1 week in advance for guaranteed availability.
          </p>
        </div>

      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-700 mt-6">Loading cars...</p>}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {/* Slider Buttons */}
      {!loading && !error && cars.length > initialCars && (
        <div className="flex justify-end mt-6 mb-4 gap-2 max-w-6xl mx-auto">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="px-3 py-1 rounded-lg shadow-md bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            disabled={currentIndex + initialCars >= cars.length}
            className="px-3 py-1 rounded-lg shadow-md bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            &#8594;
          </button>
        </div>
      )}

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 max-w-6xl mx-auto">
        {!loading &&
          !error &&
          visibleCars.map((car) => (
            <AdminCarCard key={car.id} car={car} />
          ))}
      </div>

      {/* No Cars */}
      {!loading && !error && cars.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No cars available in India right now.
        </p>
      )}

    </LayoutBox>
  );
}

export default LandingPage;