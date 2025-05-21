import { useEffect } from 'react';
import { fetchLogOut } from './api';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuth();
  useEffect(() => {
    fetchLogOut();
    onLogout();
    navigate('/');
  }, []);

  return <></>;
};

export default Logout;
