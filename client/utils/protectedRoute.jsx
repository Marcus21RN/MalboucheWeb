// client/utils/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.rol !== roleRequired) {
      return <Navigate to="/" replace />;
    }
    return children;
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
