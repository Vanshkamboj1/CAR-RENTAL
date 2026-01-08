import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // no security applied, just navigate
    navigate('/user');
  };
  const handleLogin1 = () => {
    // no security applied, just navigate
    navigate('/admin');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-black">Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-black font-semibold px-6 py-3 rounded shadow mb-30"
      >
        Continue to User Home
      </button>
      <button
        onClick={handleLogin1}
        className="bg-blue-600 hover:bg-blue-700 text-black font-semibold px-6 py-3 rounded shadow"
      >
        Continue to Admin Home
      </button>
    </div>
  );
};

export default LoginPage;
