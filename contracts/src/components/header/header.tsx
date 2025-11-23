import { Link } from 'react-router';
import style from './header.module.css';
import logo from 'assets/logo.svg';
import { useAppSelector } from '../../redux/hooks';
import { getAuthSatus } from '../../redux/slices/authSlice';
// <<<<<<<<<<<<<<<<<<<<<<<<<< remove react-cookie and react-cookie
const Header = () => {
  const stateAuth = useAppSelector(getAuthSatus);
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
        {stateAuth === 'succeeded' ? (
          <nav>
            <Link to={'/contract'}>
              <img className={style.logo} src={logo} />
            </Link>
            <Link to={'/contract'}>Договора</Link>
            <Link to={'/act'}>Акты</Link>
            <Link to={'/stats'}>Статистика</Link>
            <Link to={'/softinfo'}>ПО</Link>
            <Link to={'/logout'}>Выход</Link>
          </nav>
        ) : (
          <>
            <img className={style.logo} src={logo} />
            <p className={style.text}>Система ведения договоров</p>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
