import React, { useEffect, useState } from 'react';
import Background from '../assets/images/Background.png';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        console.log('Fetched bookings:', data);
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

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
    return <p className="text-center text-xl mt-10 text-gray-700">Loading bookings...</p>;
  if (error)
    return <p className="text-center text-red-600 mt-10 text-lg">Error: {error}</p>;
  if (bookings.length === 0)
    return <p className="text-center text-gray-700 mt-10 text-lg">No bookings found.</p>;

  return (
    <div style={componentStyle} className="flex flex-col items-center px-6">
      <h2 className="text-3xl font-bold mb-8 text-white bg-gray-800 bg-opacity-70 px-6 py-3 rounded-lg shadow-lg">
        All Bookings
      </h2>

      <div className="overflow-x-auto w-full max-w-6xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 text-left border-b">Booking ID</th>
              <th className="p-3 text-left border-b">Car ID</th>
              <th className="p-3 text-left border-b">Car Name</th>
              <th className="p-3 text-left border-b">Customer Name</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Phone</th>
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
                <td className="p-3 border-b">{booking.car?.id || 'N/A'}</td>
                <td className="p-3 border-b">{booking.car?.name || 'N/A'}</td>
                <td className="p-3 border-b">{booking.fullName}</td>
                <td className="p-3 border-b">{booking.email}</td>
                <td className="p-3 border-b">{booking.phoneNumber}</td>
                <td className="p-3 border-b">{booking.startDate}</td>
                <td className="p-3 border-b">{booking.endDate}</td>
                <td className="p-3 border-b text-green-600 font-semibold">
                  ₹{booking.totalPrice}
                </td>
                <td className="p-3 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'CONFIRMED' || booking.status === 'Approved'
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
