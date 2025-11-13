import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLazyLogoutQuery } from '../../redux/slices/authRTKSlce';

const Logout = () => {
  const navigate = useNavigate();
  const [logout] = useLazyLogoutQuery();
  useEffect(() => {
    const out = async () => {
      const result = await logout().unwrap();
      if (result == 'OK') navigate('/');
    };
    out();
  }, []);

  return <></>;
};

export default Logout;
