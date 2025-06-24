import { Link } from 'react-router';
import style from './header.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { ContentContainer } from '../containers/contentContainer';



const Header = () => {
  const { t, i18n } = useTranslation();
  //changeLanguage
  return (
    <header className={style.header}>
      <ContentContainer>
      {/* <FontAwesomeIcon icon={faFacebookF} /> */}
      {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
      <div className={style.inner}>
        <p className={style.logo}>ИВАН ЯКУБЕНКО</p>
        <nav className={style.nav}>
          <Link className={style.link} to={'/'}>{t('menu.home')}</Link>
          <Link className={style.link} to={'projects'}>{t('menu.project')}</Link>
          <div className={style.link}>
            Контакты
              <div className={style.linksBlock}>
                <ul>
                  <li><a>Linked: https://www.linkedin.com/in/palasja</a></li>
                  <li><a>GitHub: https://github.com/palasja</a></li>
                  <li><a>Email: palasja@gmail.com</a></li>
                </ul>
              </div>
            </div>
        </nav>

        <div>
          <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option className={style.language} value="ru">ru</option>
            <option className={style.language} value="en">en</option>
            <option className={style.language} value="by">by</option>
          </select>
        </div>
      </div>
      </ContentContainer>
    </header>
  );
};

export default Header;
