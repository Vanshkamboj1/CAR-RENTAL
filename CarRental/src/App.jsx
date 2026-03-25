import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import BookNow from './Pages/BookNow';
import Booking from './Pages/Booking';
import AdminLanding from './Pages/AdminLanding';
import AdminBookings from './Pages/AdminBookings';
import MakeAvailable from './Pages/MakeAvailable';
import Cart from './Pages/Cart'; // ✅ added

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AdminNavbar from './Components/ANavnbar';

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
    <AdminNavbar />
    <Outlet />
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

        {/* User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="booknow" element={<BookNow />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="cart" element={<Cart />} /> {/* ✅ added */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLanding />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="makeavailable" element={<MakeAvailable />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1 className="text-center text-white mt-20">404 - Page Not Found</h1>} />

      </Routes>
    </Router>
  );
};

export default App;