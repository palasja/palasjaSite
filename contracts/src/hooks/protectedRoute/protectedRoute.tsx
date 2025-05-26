import { Navigate } from 'react-router';
import { useAuth } from './useAuth';
import { fetchСheckAuth } from '../../helpers/api';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth, onLogin } = useAuth();

  if (!isAuth) {
    fetchСheckAuth().then(
      status => {
        if(status == 200){
          onLogin();
        } else {
          return <Navigate to="/" replace />;
        }
      }
    );

  }

  return children;
};
