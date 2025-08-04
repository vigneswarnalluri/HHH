import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requireAdmin = false, requireVolunteer = false }) => {
  const { loading, isAuthenticated, isAdmin, isVolunteer } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/volunteer" replace />;
  }

  if (requireVolunteer && !isVolunteer) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute; 