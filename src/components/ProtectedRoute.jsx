import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

/**
 * ProtectedRoute Component
 * Requirement: "Protected Route (Basic)"
 * Guards routes that require authentication (e.g. Add Task, Admin actions).
 * If authenticated -> renders children.
 * If not authenticated -> redirects to /login while preserving target route.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useTasks();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login while preserving attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
