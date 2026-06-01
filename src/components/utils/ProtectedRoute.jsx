import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectAuthLoading } from '../../store/authSlice';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
