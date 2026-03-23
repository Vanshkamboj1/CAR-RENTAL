import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('authToken');
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwt_decode(token);
    const role = decoded.role || decoded.roles || decoded.authority;
    if (!allowedRoles.includes(role)) return <Navigate to="/login" />;
    return children;
  } catch (err) {
    localStorage.removeItem('authToken');
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
