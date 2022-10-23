import useAuth from 'hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default AuthRoute;
