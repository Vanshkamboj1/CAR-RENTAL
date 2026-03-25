import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Background from '../assets/Images/Background.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER'); // default
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

      // ✅ Use backend role instead of selected role
      const backendRole = data.role;

      localStorage.setItem('authToken', token);
      localStorage.setItem('role', backendRole);

      console.log('Decoded JWT:', decoded);
      console.log('Backend Role:', backendRole);

      // ✅ Redirect based on backend role
      if (backendRole === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/user');
      }

    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <h1 className="text-3xl font-bold mb-6 text-black">WheelX Login</h1>

      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow w-full"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-100">
        Don’t have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;