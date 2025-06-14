import { useEffect } from 'react';
import { fetchLogOut } from '../helpers/api';
import { useAuth } from '../hooks/protectedRoute/useAuth';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getIsAuth, logout } from '../features/auth/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();
  // const { onLogout } = useAuth();
  useEffect(() => {
    dispatch(logout());
    navigate('/');
    // fetchLogOut();
    // onLogout();
  }, []);

  return <></>;
};

export default Logout;
