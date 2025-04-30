// ProtectedAdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    // If no admin token, redirect to admin login
    return <Navigate to="/admin_login" replace />;
  }

  // If admin token exists, allow access
  return children;
};

export default ProtectedAdminRoute;
