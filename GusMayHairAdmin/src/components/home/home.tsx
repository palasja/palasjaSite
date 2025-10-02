import AdminDateTime from '../sections/adminDateTaime';
// import { useCookies } from 'react-cookie';
import Auth from '../sections/auth';
import { useEffect, useState } from 'react';
import { API } from '../../helpers/constants';
import MoonLoader from 'react-spinners/ClipLoader';
import Feedback from '../sections/feedback';
import Services from '../sections/services';

const Home = () => {
  // const [cookies, _setCookie] = useCookies(['isAuth']);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  useEffect(() => {
    const getDefaultHighWaterMark = async () => {
      const response = await fetch(`${API}/auth`, {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsAuth(response.status == 200);
    };
    getDefaultHighWaterMark();
  }, []);
  return (
    <main>
      {isAuth == null ? (
        <MoonLoader
          color={'#FBD6BD'}
          loading={true}
          cssOverride={{
            display: 'block',
            margin: '0 auto',
            // borderColor: "red",
          }}
          size={300}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : isAuth != null && isAuth ? (
        <>
          <AdminDateTime />
          <Feedback />
          <Services />
        </>
      ) : (
        <Auth setAuth={(isAuth: boolean) => setIsAuth(isAuth)} />
      )}
    </main>
  );
};

export default Home;
