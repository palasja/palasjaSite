import { Link } from 'react-router';
import style from './header.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { ContentContainer } from '../containers/contentContainer';
import LangSelect from '../langSelect';

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
            <Link className={style.link} to={'/'}>
              {t('menu.home')}
            </Link>
            <Link className={style.link} to={'projects'}>
              {t('menu.project')}
            </Link>
            <div className={style.link}>
              {t('menu.contacts')}

              <div className={style.linksBlock}>
                <div className={style.drop}>
                    <p className={style.content}><a>Email: palasja@gmail.com</a></p>
                    <p className={style.content}><a>GitHub: https://github.com/palasja</a></p>
                    <p className={style.content}><a>Linked: https://www.linkedin.com/in/palasja</a></p>
                </div>
              </div>
            </div>
          </nav>

          {/* <div className={style.nav}>
          <select className={style.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="ru">ru</option>
            <option value="en">en</option>
            <option value="by">by</option>
          </select>
        </div> */}
          <LangSelect />
        </div>
      </ContentContainer>
    </header>
  );
};

export default Header;
