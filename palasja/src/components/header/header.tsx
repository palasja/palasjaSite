import { NavLink } from 'react-router';
import style from './header.module.css';
import { useTranslation } from 'react-i18next';
import { ContentContainer } from '../containers/contentContainer';
import LangSelect from '../langSelect';
import { useState, useEffect } from 'react';
import { MOBILE_WIDTH } from '../../helpers/heper';

const Header = () => {
  const { t, i18n } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(document.body.clientWidth <= MOBILE_WIDTH ? true : false);
  }, []);
  //changeLanguage
  return (
    <header className={style.header}>
      <ContentContainer>
        <div className={style.inner} id='test'>
          <NavLink className={style.logo} to={'/'}>
            {t('menu.firstName')} <br/> {t('menu.lastName')}
          </NavLink>
          <nav className={style.nav}>
            <NavLink className={style.link} to={'/'}
            >
              {t('menu.home')}
            </NavLink>
            <NavLink className={style.link} to={'projects'}>
              {t('menu.project')}
            </NavLink>
            <div className={style.link}>
              {t('menu.contacts')}

              <div className={style.linksBlock}>
                <div className={style.drop}>
                  <a className={style.content} href='mailto:palasja@gmail.com'>Email: palasja@gmail.com</a>
                  <a className={style.content} target="_blank" href='https://github.com/palasja'>GitHub: https://github.com/palasja</a>
                  <a className={style.content} target="_blank" href='https://www.linkedin.com/in/palasja'>Linked: https://www.linkedin.com/in/palasja</a>
                  <a className={style.content} target="_blank" href='https://teams.live.com/l/invite/FEAPMIldGUGRHGoagI?v=g1'>Teams: palasja</a>
                </div>
              </div>
            </div>
          </nav>
          <LangSelect />
        </div>
      </ContentContainer>
    </header>
  );
};

export default Header;
