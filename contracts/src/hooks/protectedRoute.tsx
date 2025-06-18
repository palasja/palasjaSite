import { useAppDispatch, useAppSelector } from '../app/hooks';
import Footer from '../components/footer';
import Header from '../components/header';
import { check, getIsAuth } from '../features/auth/authSlice';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth =  useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()
  if (!isAuth) {
    const chreckAuthToken = async () => await dispatch(check())
    chreckAuthToken();
  }

  return isAuth ? 
  <>
    <Header />
      {children}
    <Footer />
  </> 
  :
   <></>;
};
