import { useNavigate } from 'react-router';
import { useAppSelector } from '../redux/hooks';
import Footer from '../components/footer';
import Header from '../components/header';
import { useEffect } from 'react';
import { getAuthSatus } from '../redux/slices/authSlice';
import { CookiesProvider } from 'react-cookie';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const stateAuth = useAppSelector(getAuthSatus);
  useEffect(() => {
    if (stateAuth === 'rejected') {
      navigate('/');
    }
  }, [stateAuth]);
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Header />
      </CookiesProvider>
      {children}
      <Footer />
    </>
  );
};
//
