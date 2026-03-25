import React, { useEffect, useState } from 'react';
import Background from '../assets/Images/Background.png';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    // ✅ Redirect if not logged in
    if (!token) {
      navigate('/');
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/my`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // ✅ Handle unauthorized (token expired)
        if (!response.ok) {
          if (response.status === 401) {
            navigate('/');
            return;
          } else {
            throw new Error('Failed to fetch your bookings.');
          }
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const componentStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    paddingTop: '6rem',
    paddingBottom: '5rem',
  };

  if (loading)
    return (
      <p className="text-center text-xl mt-10 text-gray-700">
        Loading your bookings...
      </p>
    );

  if (error)
    return (
      <div
        style={componentStyle}
        className="flex flex-col items-center justify-center text-white"
      >
        <p className="text-red-500 bg-white bg-opacity-80 px-6 py-3 rounded-lg text-lg shadow-lg">
          {error}
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );

  if (bookings.length === 0)
    return (
      <div style={componentStyle}>
        <p className="text-center text-gray-700 mt-10 text-lg">
          No bookings found.
        </p>
      </div>
    );

  return (
    <div style={componentStyle} className="flex flex-col items-center px-6">
      <h2 className="text-3xl font-bold mb-8 text-white bg-gray-800 bg-opacity-70 px-6 py-3 rounded-lg shadow-lg">
        My Bookings
      </h2>

      <div className="overflow-x-auto w-full max-w-6xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left border-b">Booking ID</th>
              
              <th className="p-3 text-left border-b">Car Name</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Start Date</th>
              <th className="p-3 text-left border-b">End Date</th>
              <th className="p-3 text-left border-b">Total Price</th>
              <th className="p-3 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-100 transition duration-200 text-gray-800"
              >
                <td className="p-3 border-b">{booking.id}</td>
                
                <td className="p-3 border-b">{booking.car?.name || 'N/A'}</td>
                <td className="p-3 border-b">{booking.email}</td>
                <td className="p-3 border-b">{booking.startDate}</td>
                <td className="p-3 border-b">{booking.endDate}</td>
                <td className="p-3 border-b text-green-600 font-semibold">
                  ₹{booking.totalPrice}
                </td>
                <td className="p-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'CONFIRMED' ||
                      booking.status === 'Approved'
                        ? 'bg-green-200 text-green-800'
                        : booking.status === 'Rejected'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}