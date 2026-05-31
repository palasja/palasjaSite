import { useNavigate } from 'react-router';
import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { getAuthSatus, getIsAuth, getIsLoading } from '../redux/slices/authSlice';
import { CoockieWrapper } from '../helpers/CoockieWrapper';
import { useLazyCheckQuery } from '../redux/slices/authRTKSlce';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const Protected = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);
  useEffect(() => {
    if (isAuth === false) {
      navigate('/');
    }
  }, [isAuth]);
  return <>{children}</>;
};
// const Protected = ({ children }: ProtectedRouteProps) => {
//   const [cookies] = useCookies(['expireDate']);
//   // console.log(cookies);
//   // const [d, setD] = useState(cookies.expireDate);
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   console.log(11);
//   useEffect(() => {
//     console.log(cookies);
//     if (cookies.expireDate === '' || cookies.expireDate < Date.now()) {
//       dispatch(changeIsAuth(false));
//       navigate('/');
//     } else {
//       dispatch(changeIsAuth(true));
//     }
//   }, [children]);
//   return (
//     <>
//       {/* <CookiesProvider defaultSetOptions={{ path: '/' }}>
//         <Header />
//       </CookiesProvider> */}
//       {children}
//     </>
//   );
// };

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return (
    <CoockieWrapper>
      <Protected>{children}</Protected>
    </CoockieWrapper>
  );
};
