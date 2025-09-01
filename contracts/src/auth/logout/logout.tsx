import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLazyLogoutQuery } from '../../redux/slices/authRTKSlce';


const Logout = () => {
  const navigate = useNavigate();
  const [logout] = useLazyLogoutQuery();
  useEffect(() => {
    const out = async() => {
      let result = await logout().unwrap();
      if (result == 'OK') navigate('/contract');
    }
    out();
  }, []);

  return <></>;
};

export default Logout;
