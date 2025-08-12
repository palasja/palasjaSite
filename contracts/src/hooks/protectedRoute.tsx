import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Footer from '../components/footer';
import Header from '../components/header';
import { useEffect } from 'react';
import { check, getAuthSatus } from '../redux/slices/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { CookiesProvider } from 'react-cookie';
import useIsLoading from './useIsLoading';
import { getContractSatus } from '../redux/slices/contractSlice';
import { getOrganisationSatus } from '../redux/slices/orgsSlice';
import { getPersonalSatus } from '../redux/slices/personalsSlice';
import { getServicesSatus } from '../redux/slices/servicesSlice';
import { FetchStatus } from '../helpers/contractTypes';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isLoading = useIsLoading();
  const stateAuth = useAppSelector(getAuthSatus);
  useEffect(() => {
    if (stateAuth === 'rejected') {
      navigate('/');
    }
  }, [stateAuth]);
  return (
    isLoading ? <>Loading...</>:
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
