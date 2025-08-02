import { Link } from 'react-router';
import style from './header.module.css';
import Countdown from 'react-countdown';
import {  useCookies } from 'react-cookie';

const Header = () => {
  const [cookies, setCookie] = useCookies(['expireDate']);
  console.log(cookies.expireDate);
  return (
    <header className="noprint" data-testid="header">
      <nav>
        <Link to={'/contract'}>Договора</Link>
        <Link to={'/act'}>Акты</Link>
        <Link to={'/stats'}>Статистика</Link>

      </nav>
      <div data-testid='qwe'>
<Countdown date={cookies.expireDate} />
      </div>
      
    </header>

  );
};

export default Header;
