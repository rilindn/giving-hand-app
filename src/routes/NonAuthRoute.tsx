import useAuth from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default NonAuthRoute;
