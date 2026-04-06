import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Background from '../assets/Images/Background.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid email or password');

      const data = await response.json();
      const token = data.token;
      const decoded = jwtDecode(token);
      const backendRole = data.role;

      localStorage.setItem('authToken', token);
      localStorage.setItem('role', backendRole);

      if (backendRole === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/user');
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Background})` }}
    >

      {/* Glass Box */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          WheelX Login
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-black text-white py-2 rounded-lg w-full hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="mt-4 text-center text-sm text-gray-700">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>

      </div>

      {/* 🔥 Render Info Box */}
      <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-gray-200 max-w-xs">
        <p className="text-xs text-gray-700 leading-relaxed text-center">
          This site is deployed on Render. The first response may be delayed —
          please wait 2–3 minutes if the server is waking up.
        </p>
      </div>

    </div>
  );
};

export default LoginPage;