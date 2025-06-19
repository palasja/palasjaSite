import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Footer from '../components/footer';
import Header from '../components/header';
import { check, getIsAuth } from '../features/auth/authSlice';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth =  useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() =>{
    if (!isAuth) {
      const chreckAuthToken = async () => await dispatch(check())
      chreckAuthToken().then(() => {if (!isAuth){navigate('/')}});
      
    }
  },[]);

  return isAuth ? 
  <>
    <Header />
      {children}
    <Footer />
  </> 
  :
   <></>;
};
