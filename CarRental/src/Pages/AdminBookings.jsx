import React, { useEffect, useState } from 'react';
import Background from '../assets/Images/Background.png';
import { useNavigate } from 'react-router-dom';
import LayoutBox from '../Components/LayoutBox.jsx';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDocs, setSelectedDocs] = useState(null);

  // 🔥 NEW STATES
  const [currentDoc, setCurrentDoc] = useState(0);
  const [zoomed, setZoomed] = useState(false);

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

  if (loading) {
    return (
      <LayoutBox background={Background}>
        <p className="text-center text-lg text-gray-700">Loading bookings...</p>
      </LayoutBox>
    );
  }

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

      {/* Card */}
      <div className="w-full bg-white/90 rounded-2xl shadow-xl p-6">

        {/* Scroll */}
        <div className="max-h-[60vh] overflow-y-auto overflow-x-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400/40 hover:scrollbar-thumb-gray-400/70">

          <table className="w-full text-sm border-collapse">

            {/* Sticky Header */}
            <thead>
              <tr className="text-gray-700">
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Booking ID</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">User ID</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Car ID</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Car Name</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Customer</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Email</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Phone</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Start</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">End</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Docs</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Price</th>
                <th className="p-3 text-left bg-gray-100 sticky top-0 z-20">Status</th>
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

                  <td className="p-3 border-t">
                    {(booking.aadharUrl && booking.drivingLicenseUrl) ? (
                      <button
                        onClick={() => {
                          setSelectedDocs({
                            aadharUrl: booking.aadharUrl,
                            drivingLicenseUrl: booking.drivingLicenseUrl,
                          });
                          setCurrentDoc(0);
                          setZoomed(false);
                        }}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-xs"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>

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
      </div>

      {/* 🔥 PREMIUM DOC VIEWER */}
      {selectedDocs && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">

          {/* 🔥 Smaller Modal */}
          <div className="relative w-full max-w-3xl h-[70vh] bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">

            {/* Close */}
            <button
              onClick={() => {
                setSelectedDocs(null);
                setCurrentDoc(0);
                setZoomed(false);
              }}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg z-50 text-sm"
            >
              ✕
            </button>

            {/* Left Arrow */}
            <button
              onClick={() => setCurrentDoc((prev) => (prev === 0 ? 1 : 0))}
              className="absolute left-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition z-40"
            >
              <span className="text-white text-xl">‹</span>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => setCurrentDoc((prev) => (prev === 1 ? 0 : 1))}
              className="absolute right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition z-40"
            >
              <span className="text-white text-xl">›</span>
            </button>

            {/* Image */}
            <div
              onClick={() => setZoomed(!zoomed)}
              className={`transition-all duration-300 ${
                zoomed ? 'scale-110 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
            >
              <img
                src={
                  currentDoc === 0
                    ? selectedDocs.aadharUrl
                    : selectedDocs.drivingLicenseUrl
                }
                alt="Document"
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Label */}
            <div className="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-lg">
              {currentDoc === 0 ? 'Aadhar Card' : 'Driving License'}
            </div>

          </div>
        </div>
      )}

    </LayoutBox>
  );
}