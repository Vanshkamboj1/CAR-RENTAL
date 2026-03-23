import React, { useState } from 'react';
import Background from '../assets/Images/Background.png';

export default function MakeAvailable() {
  const [carId, setCarId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMakeAvailable = async () => {
    if (!carId) {
      setMessage('Please enter a valid Car ID.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cars/${carId}/available`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to update availability.');

      setMessage(`Car with ID ${carId} marked as available successfully!`);
      setCarId('');
    } catch (err) {
      setMessage(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const componentStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5rem',
  };

  return (
    <div style={componentStyle}>
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Make Car Available</h2>

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
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          {loading ? 'Updating...' : 'Make Available'}
        </button>

        {message && (
          <p className={`mt-4 text-lg font-medium ${message.startsWith('') ? 'text-green-700' : 'text-red-700'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
