import { Link } from 'react-router';
import style from './header.module.css';

const Header = () => {
  //changeLanguage
  return (
    <header className='noprint' data-testid='header'>
      <nav>
        <Link to={'/contract'}>Договора</Link>
        <Link to={'/act'}>Акты</Link>
      </nav>
    </header>
  );
};

export default Header;
