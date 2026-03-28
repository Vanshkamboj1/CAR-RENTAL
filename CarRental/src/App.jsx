import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import BookNow from './Pages/BookNow';
import Booking from './Pages/Booking';
import AdminLanding from './Pages/AdminLanding';
import AdminBookings from './Pages/AdminBookings';
import MakeAvailable from './Pages/MakeAvailable';
import Cart from './Pages/Cart';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ANavbar from './Components/ANavnbar';

/* -------- Protected Route -------- */

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

/* -------- Layouts -------- */

const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const AdminLayout = () => (
  <>
    <ANavbar />
    <Outlet />
    <Footer /> {/* ✅ Added */}
  </>
);

/* -------- App -------- */

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔐 Protected USER Routes */}
        <Route element={<ProtectedRoute allowedRole="USER" />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="booknow" element={<BookNow />} />
            <Route path="booking/:id" element={<Booking />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>

        {/* 🔐 Protected ADMIN Routes */}
        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLanding />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="makeavailable" element={<MakeAvailable />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center text-black mt-20 text-2xl font-semibold">
              404 - Page Not Found
            </h1>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;