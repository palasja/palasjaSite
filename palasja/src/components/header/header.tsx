import { Link } from 'react-router';
import style from './header.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import Conteiner from '../../conteiner';



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
        <nav className={style.nav}>
          <Link className={style.link} to={'/'}>{t('menu.home')}</Link>
          <Link className={style.link} to={'projects'}>{t('menu.project')}</Link>
          <p className={style.link}>Контакты</p>
        </nav>
        <div>
          <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option className={style.language} value="ru">ru</option>
            <option className={style.language} value="en">en</option>
            <option className={style.language} value="by">by</option>
          </select>
        </div>
      </div>
      </Conteiner>
    </header>
  );
};

export default Header;
