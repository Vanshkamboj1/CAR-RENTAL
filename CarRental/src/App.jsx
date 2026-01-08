import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LandingPage from './Pages/LandingPage';
import AboutUs from './Pages/AboutUs';
import BookNow from './Pages/BookNow';
import Booking from './Pages/Booking';
import AdminLanding from './Pages/AdminLanding'; 
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AdminNavbar from './Components/ANavnbar';
import AdminBookings from './Pages/AdminBookings';
import MakeAvailable from './Pages/MakeAvailable';

const App = () => {
  return (
    <Router>
      <Routes>

        {/* 🔹 Login Page (No Navbar or Footer) */}
        <Route path="/" element={<LoginPage />} />

        {/* 🔹 User Routes */}
        <Route
          path="/user"
          element={
            <>
              <Navbar />
              <LandingPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/user/about"
          element={
            <>
              <Navbar />
              <AboutUs />
              <Footer />
            </>
          }
        />

        <Route
          path="/user/booknow"
          element={
            <>
              <Navbar />
              <BookNow />
              <Footer />
            </>
          }
        />

        <Route
          path="/user/booking/:id"
          element={
            <>
              <Navbar />
              <Booking />
              <Footer />
            </>
          }
        />

        {/* 🔹 Admin Routes */}
        <Route
          path="/admin"
          element={
            <>
              <AdminNavbar />
              <AdminLanding />
            </>
          }
        />

        <Route
          path="/admin/AdminBookings"
          element={
            <>
              <AdminNavbar />
              <AdminBookings />
            </>
          }
        />

        <Route 
          path="/admin/makeavailable"
          element={
            <>
              <AdminNavbar />
              <MakeAvailable />
            </>
        }
      />

      </Routes>
    </Router>
  );
};

export default App;
