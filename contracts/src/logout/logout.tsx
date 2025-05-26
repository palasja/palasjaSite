import { useEffect } from 'react';
import { fetchLogOut } from '../helpers/api';
import { useAuth } from '../hooks/protectedRoute/useAuth';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuth();
  useEffect(() => {
    fetchLogOut();
    onLogout();

  }, []);

  return <></>;
};

export default Logout;
