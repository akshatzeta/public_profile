import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  // Check if the user is authenticated (replace with your actual authentication logic)
  const isAuthenticated = !!localStorage.getItem('authToken'); // Replace 'authToken' with your key

  // If authenticated, render the element; otherwise, redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
