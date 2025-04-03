import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../context/authProvider';

const RequireAuth = () => {
  const { isAuthenticate, loading } = useAuthStore();
  const location = useLocation();
  console.log(isAuthenticate);
  
  if (loading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  return isAuthenticate ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;