import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AdminRoute() {
  const location = useLocation();

  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  // No autenticado -> login, preservando from
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Autenticado pero no admin -> home
  if (rol !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  // Admin -> renderiza rutas hijas
  return <Outlet />;
}
