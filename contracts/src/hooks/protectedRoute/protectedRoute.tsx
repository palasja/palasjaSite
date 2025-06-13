import { Navigate, useNavigate } from 'react-router';
import { useAuth } from './useAuth';
import { fetchСheckAuth } from '../../helpers/api';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth, onLogin } = useAuth();
  const navigate = useNavigate();
  if (!isAuth) {
    fetchСheckAuth().then((status) => {
      if (status == 200) {
        onLogin();
      } else {
        return navigate('/');
        // return <Navigate to="/" replace />;
      }
    });
  }

  return children;
};
