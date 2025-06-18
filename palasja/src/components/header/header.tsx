import { Link } from 'react-router';
import style from './header.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import Conteiner from '/src/conteiner.tsx';


const Header = () => {
  const { t, i18n } = useTranslation();
  //changeLanguage
  return (
    <header className={style.header}>
      <Conteiner>
      {/* <FontAwesomeIcon icon={faFacebookF} /> */}
      {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
      <div className={style.inner}>
        <p className={style.logo}>ИВАН ЯКУБЕНКО</p>
        <nav>
          <p className={style.link}><Link to={'/'}>{t('menu.home')}</Link></p>
          <p className={style.link}><Link to={'projects'}>{t('menu.project')}</Link></p>
          <p className={style.link}>Контакты</p>
        </nav>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          {/* <option value='ru'>ru</option> */}
          <option value="ru">ru</option>
          <option value="en">en</option>
          <option value="by">by</option>
        </select>
      </div>
      </Conteiner>
    </header>
  );
};

export default Header;
