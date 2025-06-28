import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Footer from '../components/footer';
import Header from '../components/header';
import { useEffect } from 'react';
import { check, getIsAuth } from '../redux/slices/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      dispatch(check())
        .then(unwrapResult)
        .catch(() => {
          navigate('/');
        });
    }
  }, []);

  return isAuth ? (
    <>
      <Header />
      {children}
      <Footer />
    </>
  ) : (
    <>
      <p>Unouthorize</p>
    </>
  );
};
