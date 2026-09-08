import { Link, NavLink } from 'react-router';
import style from './header.module.css';
import logo from '../../assets/logo.svg';
import senyaLoginImg from '../../assets/senya_face_s.png';
import palasjaLoginImg from '../../assets/palasja_face_s.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getIsAuth, getUser } from '../../redux/slices/authSlice';
import { ContractIcon, ListIcon, LogoutIcon, SoftIcon, StatIcon } from '../icons/icons';
import DetailPortal from '../modal/details/detailModal';
import { createPortal } from 'react-dom';
import { changeIsServerError, getIsServerError } from '../../redux/slices/errorSlice';
import { useEffect, useState } from 'react';

// <<<<<<<<<<<<<<<<<<<<<<<<<< remove react-cookie and react-cookie

const Header = () => {
  const isAuth = useAppSelector(getIsAuth);
  const userSession = sessionStorage.getItem('user');
  const userRedux = useAppSelector(getUser)
  const user = userRedux ? userRedux : userSession;

  // const [cookies] = useCookies(['expireDate']);
  // console.log(cookies);
  // const [d, setD] = useState(cookies.expireDate);

  // useEffect(() => {
  //   if(d !== cookies.expireDate) setD(cookies.expireDate);
  //   console.log(d);
  // }, [cookies.expireDate]);
  return (
    <header className={`noprint ${style.header}`} data-testid="header">
      <div className={style.content}>
        <img className={style.logo} src={logo} />
        {isAuth ? (
          <>
            <nav className={`noprint ${style.nav}`}>
              <NavLink to={'/org'} className={style.link}>
                <ContractIcon /> <span className={style.linkText}>Организации</span>
              </NavLink>
              <NavLink to={'/stats'} className={style.link}>
                <StatIcon /> <span className={style.linkText}>Статистика</span>
              </NavLink>
              <NavLink to={'/softinfo'} className={style.link}>
                <SoftIcon /> <span className={style.linkText}>ПО</span>
              </NavLink>
              <NavLink to={'/price'} className={style.link}>
                <ListIcon /> <span className={style.linkText}>Прайс</span>
              </NavLink>
            </nav>
            <div className={style.logoutContainer}>
              <div className={style.logout}>

                {/* <LogoutIcon /> */}
                <img src={user === 'palasja' ? palasjaLoginImg : senyaLoginImg} />
              </div>
              {/* <div className={style.user}> */}
              <Link className={style.user} to={'/logout'} >Выход: {user}</Link>
              {/* </div> */}
            </div>

          </>
        ) : (
          <>
            <p className={style.text}>Система ведения договоров</p>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
