import React, { useEffect, useState } from 'react';
import Background from '../assets/Images/Background.png';
import { useNavigate } from 'react-router-dom';
import LayoutBox from "../Components/LayoutBox.jsx";

export default function Cart() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

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

  // ✅ Loading
  if (loading)
    return (
      <LayoutBox background={Background}>
        <p className="text-center text-xl text-gray-700">
          Loading your bookings...
        </p>
      </LayoutBox>
    );

  // ❌ Error
  if (error)
    return (
      <LayoutBox background={Background}>
        <div className="flex flex-col items-center justify-center">
          <p className="text-red-500 bg-white/80 px-6 py-3 rounded-lg text-lg shadow-lg">
            {error}
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </LayoutBox>
    );

  // 📭 No bookings
  if (bookings.length === 0)
    return (
      <LayoutBox background={Background}>
        <p className="text-center text-gray-700 text-lg">
          No bookings found.
        </p>
      </LayoutBox>
    );

  // ✅ Main UI
  return (
    <LayoutBox background={Background}>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        My Bookings
      </h2>

      {/* Table */}
      <div className="overflow-x-auto w-full bg-white/90 rounded-2xl shadow-xl p-6">
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
                      booking.status === 'REQUESTED'
                        ? 'bg-yellow-200 text-yellow-800'
                        : booking.status === 'CONFIRMED' || booking.status === 'APPROVED'
                        ? 'bg-blue-200 text-blue-800'
                        : booking.status === 'REJECTED'
                        ? 'bg-red-200 text-red-800'
                        : booking.status === 'COMPLETED'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-gray-200 text-gray-800'
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

    </LayoutBox>
  );
}