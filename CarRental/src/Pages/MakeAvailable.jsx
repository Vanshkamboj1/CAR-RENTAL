import React, { useState } from 'react';
import Background from '../assets/Images/Background.png';
import LayoutBox from '../Components/LayoutBox.jsx';

export default function MakeAvailable() {
  const [carId, setCarId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleMakeAvailable = async () => {
    if (!carId) {
      setMessage({ text: 'Please enter a valid Car ID.', type: 'error' });
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setMessage({ text: 'Please log in as Admin first.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

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

      setMessage({
        text: `Car with ID ${carId} marked as available successfully!`,
        type: 'success',
      });

      setCarId('');

    } catch (err) {
      setMessage({
        text: err.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutBox background={Background}>

      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Make Car Available
        </h2>

        <input
          type="number"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          placeholder="Enter Car ID"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleMakeAvailable}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? 'Updating...' : 'Make Available'}
        </button>

        {/* Message */}
        {message.text && (
          <p
            className={`mt-4 font-medium ${
              message.type === 'success'
                ? 'text-green-700'
                : 'text-red-700'
            }`}
          >
            {message.text}
          </p>
        )}

      </div>

    </LayoutBox>
  );
}