import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Footer from '../components/footer';
import Header from '../components/header';
import { useEffect, useState } from 'react';
import { changeIsAuth, getAuthSatus, getIsAuth } from '../redux/slices/authSlice';
import { CookiesProvider, useCookies } from 'react-cookie';
import { CoockieWrapper } from '../helpers/CoockieWrapper';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const Protected = ({ children }: ProtectedRouteProps) => {
  const [cookies] = useCookies(['expireDate']);
  // console.log(cookies);
  // const [d, setD] = useState(cookies.expireDate);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cookies.expireDate === '' || cookies.expireDate < Date.now()) {
      dispatch(changeIsAuth(false));
      navigate('/');
    } else {
      dispatch(changeIsAuth(true));
    }
  }, []);
  return (
    <>
      {/* <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Header />
      </CookiesProvider> */}
      {children}
    </>
  );
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return (
    <CoockieWrapper>
      <Protected>{children}</Protected>
    </CoockieWrapper>
  );
};
// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const [cookies] = useCookies(['expireDate']);
//     console.log(cookies);
//   const [d, setD] = useState(cookies.expireDate);
//   const navigate = useNavigate();
//   const isAuth = useAppSelector(getIsAuth);
//   useEffect(() => {
//     if (cookies.expireDate === '' || cookies.expireDate < Date.now()) {
//       navigate('/');
//     }
//   }, []);
//   return (
//     <>
//       {/* <CookiesProvider defaultSetOptions={{ path: '/' }}>
//         <Header />
//       </CookiesProvider> */}
//       {children}
//     </>
//   );
// };
