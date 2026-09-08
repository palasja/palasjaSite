import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLazyLogoutQuery } from '../../redux/slices/authRTKSlce';
// import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../redux/hooks';
import { changeIsAuth, changeUser } from '../../redux/slices/authSlice';
import { CoockieWrapper } from '../../helpers/CoockieWrapper';

const LogoutAct = () => {
  const navigate = useNavigate();
  const [logout] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();
  // const [cookies] = useCookies(['expireDate']);
  useEffect(() => {
    const out = async () => {
      const result = await logout().unwrap();
      sessionStorage.clear();
      dispatch(changeUser(undefined));
      dispatch(changeIsAuth(false));
      // cookies.expireDate = '';
      if (result == 'OK') navigate('/');
    };
    out();
  }, []);

  return <></>;
};

const Logout = () => {
  return (
    <CoockieWrapper>
      <LogoutAct />
    </CoockieWrapper>
  );
};
export default Logout;
