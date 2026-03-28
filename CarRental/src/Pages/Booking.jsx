import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Background from '../assets/Images/Background.png';
import LayoutBox from "../Components/LayoutBox.jsx";

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
  const [message, setMessage] = useState({ text: '', type: '' });

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      setMessage({ text: '⚠️ Please login before booking.', type: 'error' });
      setTimeout(() => navigate('/'), 1500);
    }
  }, [token, navigate]);

  // ✅ Price calculation
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      if (end < start) {
        setTotalPrice(0);
        return;
      }

      const diffTime = end - start;
      const diffDays =
        Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

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
      setMessage({ text: 'Please select both dates.', type: 'error' });
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      setMessage({ text: 'End date cannot be before start.', type: 'error' });
      return;
    }

    const bookingData = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalPrice,
      status: 'Pending',
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/car/${car.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        setMessage({
          text: `✅ Booking confirmed for ${car.name}! ₹${totalPrice}`,
          type: 'success',
        });

        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          startDate: '',
          endDate: '',
        });

        setTotalPrice(0);

        setTimeout(() => setMessage({ text: '', type: '' }), 4000);
      } else {
        const err = await response.text();
        setMessage({ text: '❌ Booking failed: ' + err, type: 'error' });
      }
    } catch (error) {
      setMessage({
        text: '⚠️ Backend connection error.',
        type: 'error',
      });
    }
  };

  if (!car)
    return (
      <LayoutBox background={Background}>
        <p className="text-center text-lg text-gray-700">
          No car selected
        </p>
      </LayoutBox>
    );

  return (
    <LayoutBox background={Background}>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Book {car.name}
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto"
      >

        {/* Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-center font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-4 text-gray-700">
          <p><strong>Car ID:</strong> {car.id}</p>
          <p><strong>Price/day:</strong> ₹{car.price}</p>
        </div>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <label className="block mb-1 font-medium">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <label className="block mb-1 font-medium">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 mb-5 border rounded"
          required
        />

        <div className="flex justify-between mb-5 text-lg font-semibold">
          <span>Total Price:</span>
          <span className="text-green-600">₹{totalPrice}</span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Confirm Booking
        </button>
      </form>

    </LayoutBox>
  );
};

export default Booking;