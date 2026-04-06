import { Link, NavLink } from 'react-router';
import style from './header.module.css';
import logo from '../../assets/logo.svg';
import { useAppSelector } from '../../redux/hooks';
import { getAuthSatus, getIsAuth } from '../../redux/slices/authSlice';
import { ContractIcon, LogoutIcon, SoftIcon, StatIcon } from '../icons/icons';
// <<<<<<<<<<<<<<<<<<<<<<<<<< remove react-cookie and react-cookie
const Header = () => {
  const isAuth = useAppSelector(getIsAuth);
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
                <ContractIcon /> Организации
              </NavLink>
              <NavLink to={'/stats'} className={style.link}>
                <StatIcon /> Статистика
              </NavLink>
              <NavLink to={'/softinfo'} className={style.link}>
                <SoftIcon /> ПО
              </NavLink>
            </nav>
            <Link to={'/logout'} className={style.logout}>
              <LogoutIcon />
            </Link>
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
