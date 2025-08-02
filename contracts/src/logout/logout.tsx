import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';

const Logout = () => {
  const navigate = useNavigate();
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
