import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Footer from '../components/footer';
import Header from '../components/header';
import { useEffect } from 'react';
import { check, getAuthSatus } from '../redux/slices/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { CookiesProvider } from 'react-cookie';
import useIsLoading from './useIsLoading';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useIsLoading();
  const stateAuth = useAppSelector(getAuthSatus);
  useEffect(() => {
    // if (!isAuth) {
    dispatch(check())
      .then(unwrapResult)
      .catch(() => {
        navigate('/');
      });
    // }
  }, [children]);
  return isLoading ? 
    <>
      Loading...
    </> : 
      stateAuth === 'rejected' ? 
      <p>Unouthorize</p>
      : 
        <>
        <CookiesProvider  defaultSetOptions={{ path: '/' }}>
          <Header />
        </CookiesProvider>
          {children}
          <Footer />
        </>
};
