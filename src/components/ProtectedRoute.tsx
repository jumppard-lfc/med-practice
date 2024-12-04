import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const doctor = useStore((state) => state.doctor);
  const location = useLocation();

  if (!doctor) {
    return <Navigate to="/doctor/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}