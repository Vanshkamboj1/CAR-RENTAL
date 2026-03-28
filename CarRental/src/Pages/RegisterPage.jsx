import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Background from '../assets/Images/Background.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      if (!response.ok) {
        throw new Error('Registration failed. Email may already be in use.');
      }

      const data = await response.json();
      const token = data.token;
      const backendRole = data.role;

      localStorage.setItem('authToken', token);
      localStorage.setItem('role', backendRole);

      if (backendRole === 'ADMIN') navigate('/admin');
      else navigate('/user');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >

      {/* Glass Box */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Create Account
        </h1>

        {/* Form */}
        <form onSubmit={handleRegister}>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

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

          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Register as
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
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
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>

      </div>

    </div>
  );
};

export default RegisterPage;