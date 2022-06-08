import { Navigate } from 'react-router-dom';
import useAuth from '../common/contexts/AuthContext';

// Source: https://ui.dev/react-router-protected-routes-authentication
const RequireAuth = ({ children }: any) => {
  const { driver } = useAuth();

  return driver?.id ? children : <Navigate to='/login' replace />;
};

export default RequireAuth;
