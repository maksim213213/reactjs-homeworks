import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectAuthLoading } from '../../store/authSlice';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
