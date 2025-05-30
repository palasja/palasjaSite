import { Link } from 'react-router';
import style from './heade.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  const { t, i18n } = useTranslation();
  //changeLanguage
  return (
    <header>
      <FontAwesomeIcon icon={faFacebookF} />
      {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
      <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {/* <option value='ru'>ru</option> */}
        <option value="ru">ru</option>
        <option value="en">en</option>
        <option value="by">by</option>
      </select>
      <nav>
        <Link to={'/'}>{t('menu.home')}</Link>
      </nav>
      <nav>
        <Link to={'projects'}>{t('menu.project')}</Link>
      </nav>
    </header>
  );
};

export default Header;
