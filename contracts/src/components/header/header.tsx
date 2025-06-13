import { Link } from 'react-router';
import style from './heade.module.css';

const Header = () => {
  //changeLanguage
  return (
    <header className='noprint'>
      <nav>
        <Link to={'/'}>Договора</Link>
      </nav>
      <nav>
        <Link to={'/act'}>Акты</Link>
      </nav>
    </header>
  );
};

export default Header;
