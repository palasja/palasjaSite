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
        <div className={style.nav}> {/*не уверенна, что так правильно, но мне надо было отцентровать этот элемент. nav вписала, чтобы еще один класс не описывать с такими же параметрами*/}
          <select className={style.language}  onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="ru">ru</option> 
            <option value="en">en</option>
            <option value="by">by</option>
          </select>
        </div>
      </div>
      </Conteiner>
    </header>
  );
};

export default Header;
