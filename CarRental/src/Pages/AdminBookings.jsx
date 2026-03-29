import React, { useEffect, useState } from 'react';
import Background from '../assets/Images/Background.png';
import { useNavigate } from 'react-router-dom';
import LayoutBox from '../Components/LayoutBox.jsx';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');

    if (!token) {
      setError('No token found. Please login again.');
      setLoading(false);
      return;
    }

    if (role !== 'ADMIN') {
      setError('Access denied. Only admin can view this page.');
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch bookings');

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 🔄 Loading
  if (loading) {
    return (
      <LayoutBox background={Background}>
        <p className="text-center text-lg text-gray-700">
          Loading bookings...
        </p>
      </LayoutBox>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <LayoutBox background={Background}>
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go to Login
          </button>
        </div>
      </LayoutBox>
    );
  }

  return (
    <LayoutBox background={Background}>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        All Bookings
      </h2>

      {/* Table */}
      <div className="overflow-x-auto w-full bg-white/90 rounded-2xl shadow-xl p-6">

        <table className="w-full text-sm border-collapse">

          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Booking ID</th>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Car ID</th>
              <th className="p-3 text-left">Car Name</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Start</th>
              <th className="p-3 text-left">End</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100 transition">
                <td className="p-3 border-t">{booking.id}</td>
                <td className="p-3 border-t">{booking.userId}</td>
                <td className="p-3 border-t">{booking.car?.id || 'N/A'}</td>
                <td className="p-3 border-t">{booking.car?.name || 'N/A'}</td>
                <td className="p-3 border-t">{booking.fullName}</td>
                <td className="p-3 border-t">{booking.email}</td>
                <td className="p-3 border-t">{booking.phoneNumber}</td>
                <td className="p-3 border-t">{booking.startDate}</td>
                <td className="p-3 border-t">{booking.endDate}</td>

                <td className="p-3 border-t text-green-600 font-semibold">
                  ₹{booking.totalPrice}
                </td>

                <td className="p-3 border-t">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'REQUESTED'
                        ? 'bg-yellow-100 text-yellow-700'
                        : booking.status === 'CONFIRMED' || booking.status === 'APPROVED'
                        ? 'bg-blue-100 text-blue-700'
                        : booking.status === 'REJECTED'
                        ? 'bg-red-100 text-red-700'
                        : booking.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
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