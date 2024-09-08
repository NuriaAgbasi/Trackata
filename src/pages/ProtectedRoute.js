
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signup" />;
    }

    if (
        user === null ||
        (allowedRoles && !allowedRoles.includes(user.role))
      ) {
        return <div>permission denied for you</div>; // Redirect to a permission denied page
      }

    return children;
};

export default ProtectedRoute;
