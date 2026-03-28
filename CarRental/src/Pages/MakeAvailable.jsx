import React, { useState } from 'react';
import Background from '../assets/Images/Background.png';
import LayoutBox from '../Components/LayoutBox.jsx';

export default function MakeAvailable() {
  const [carId, setCarId] = useState('');
  const [carLoading, setCarLoading] = useState(false);
  const [carMessage, setCarMessage] = useState({ text: '', type: '' });

  const [bookingId, setBookingId] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState({ text: '', type: '' });

  const token = localStorage.getItem('authToken');

  const handleMakeAvailable = async () => {
    if (!carId) {
      setCarMessage({ text: 'Please enter a valid Car ID.', type: 'error' });
      return;
    }
    if (!token) {
      setCarMessage({ text: 'Please log in as Admin first.', type: 'error' });
      return;
    }

    setCarLoading(true);
    setCarMessage({ text: '', type: '' });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/cars/${carId}/available`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update availability.');
      }

      setCarMessage({
        text: `Car with ID ${carId} marked as available successfully!`,
        type: 'success',
      });
      setCarId('');
    } catch (err) {
      setCarMessage({ text: err.message, type: 'error' });
    } finally {
      setCarLoading(false);
    }
  };

  const handleBookingAction = async (actionType) => {
    if (!bookingId) {
      setBookingMessage({ text: 'Please enter a valid Booking ID.', type: 'error' });
      return;
    }
    if (!token) {
      setBookingMessage({ text: 'Please log in as Admin first.', type: 'error' });
      return;
    }

    setBookingLoading(true);
    setBookingMessage({ text: '', type: '' });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/bookings/${bookingId}/${actionType}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to ${actionType} booking.`);
      }

      setBookingMessage({
        text: `Booking with ID ${bookingId} was successfully ${actionType}d!`,
        type: 'success',
      });
      setBookingId('');
    } catch (err) {
      setBookingMessage({ text: err.message, type: 'error' });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <LayoutBox background={Background}>
      <div className="flex flex-col gap-10 max-w-lg mx-auto w-full">
        
        {/* MAKE CAR AVAILABLE */}
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Make Car Available
          </h2>

          <input
            type="number"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            placeholder="Enter Car ID"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <button
            onClick={handleMakeAvailable}
            disabled={carLoading}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition"
          >
            <span className="drop-shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]">
              {carLoading ? 'Updating...' : 'Make Available'}
            </span>
          </button>

          {carMessage.text && (
            <p className={`mt-4 font-medium ${carMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {carMessage.text}
            </p>
          )}
        </div>

        {/* MANAGE BOOKINGS */}
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Manage Booking Requests
          </h2>

          <input
            type="number"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            placeholder="Enter Booking ID"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <div className="flex gap-4">
            <button
              onClick={() => handleBookingAction('approve')}
              disabled={bookingLoading}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition"
            >
              <span className="drop-shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]">
                {bookingLoading ? 'Processing...' : 'Approve'}
              </span>
            </button>

            <button
              onClick={() => handleBookingAction('reject')}
              disabled={bookingLoading}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition"
            >
              <span className="drop-shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]">
                {bookingLoading ? 'Processing...' : 'Reject'}
              </span>
            </button>
          </div>

          {bookingMessage.text && (
            <p className={`mt-4 font-medium ${bookingMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {bookingMessage.text}
            </p>
          )}
        </div>

      </div>
    </LayoutBox>
  );
}