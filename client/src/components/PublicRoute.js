// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />; // Redirect to homepage if token exists
  }

  return children; // Allow access to the page if no token
}

export default PublicRoute;
