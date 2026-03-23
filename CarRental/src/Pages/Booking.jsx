import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Background from '../assets/Images/Background.png';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    startDate: '',
    endDate: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState({ text: '', type: '' }); // ✅ success/error message state

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      setMessage({ text: '⚠️ Please login before booking.', type: 'error' });
      setTimeout(() => navigate('/login'), 1500);
    }
  }, [token, navigate]);

  // ✅ Auto-calculate total price
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      // Ensure valid range
      if (end < start) {
        setTotalPrice(0);
        return;
      }

      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // ✅ inclusive of same-day
      setTotalPrice(diffDays * (car?.price || 0));
    } else {
      setTotalPrice(0);
    }
  }, [formData.startDate, formData.endDate, car?.price]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!car || !car.id) {
      setMessage({ text: 'Car information missing!', type: 'error' });
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setMessage({ text: 'Please select both start and end dates.', type: 'error' });
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end < start) {
      setMessage({ text: 'End date cannot be before start date.', type: 'error' });
      return;
    }

    const bookingData = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalPrice: totalPrice,
      status: 'Pending',
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/car/${car.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setMessage({
          text: `✅ Booking confirmed for ${car.name}! Total Price: ₹${totalPrice}`,
          type: 'success',
        });

        // Reset form after success
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          startDate: '',
          endDate: '',
        });
        setTotalPrice(0);

        // Optional: clear success message after a few seconds
        setTimeout(() => setMessage({ text: '', type: '' }), 4000);
      } else {
        const err = await response.text();
        setMessage({ text: '❌ Booking failed: ' + err, type: 'error' });
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setMessage({
        text: '⚠️ Unable to connect to backend. Please check your server.',
        type: 'error',
      });
    }
  };

  if (!car) return <p className="text-center mt-10 text-white">No car selected</p>;

  const componentStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    paddingTop: '5rem',
    paddingBottom: '5rem',
  };

  return (
    <div style={componentStyle} className="flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">
          Book {car.name}
        </h2>

        {/* ✅ Success / Error Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-3 text-gray-600">
          <p><strong>Car ID:</strong> {car.id}</p>
          <p><strong>Price per day:</strong> ₹{car.price}</p>
        </div>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded text-black bg-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded text-black bg-white"
          required
        />

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded text-black bg-white"
          required
        />

        <label className="block mb-1 font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded text-black bg-white"
          required
        />

        <label className="block mb-1 font-medium text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 mb-5 border rounded text-black bg-white"
          required
        />

        <div className="flex justify-between items-center mb-5 text-lg font-semibold">
          <span>Total Price:</span>
          <span className="text-green-600">₹{totalPrice}</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
