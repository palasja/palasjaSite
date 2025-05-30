import style from './header.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import { togleStyle } from '../../helpers/functions';
import { useEffect, useState } from 'react';
import CloseBtn from '../closeBtn';
import { INSTAGRAM_LINK, PHONE_NUMBER, RESPONSIVE } from '../../helpers/constants';
import { createPortal } from 'react-dom';

const BURGER_LINE_COUNT = 3;
const Links: { to: string; name: string }[] = [
  { to: 'advantage', name: 'Преимущества' },
  { to: 'services', name: 'Услуги' },
  { to: 'about', name: 'Обо мне' },
  { to: 'jobs', name: 'Мои работы' },
  { to: 'feedback', name: 'Отзывы' },
];

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setIsMobile(document.body.clientWidth <= RESPONSIVE.tablet ? true : false);
    setShowMenu(document.body.clientWidth <= RESPONSIVE.tablet ? false : true);
  }, []);
  const togleBurgerMenu = () => {
    if (!isMobile) return;
    if (showMenu) {
      document.body.classList.remove(style.lockScroll);
      setShowMenu(false);
    } else {
      document.body.classList.add(style.lockScroll);
      setShowMenu(true);
    }
  };

  return (
    <header className={style.header}>
      <a href="/#maria">
        <img src="/gusMaryLogo.svg" alt="Gus Mary Hair Logo" className={style.logo} />
        <img src="/gusMaryLogoSmall.svg" alt="Gus Mary Hair Logo" className={style.logoSmall} />
      </a>
      {showMenu && (
        <>
          <nav id="navPanel" className={style.navigation} onClick={togleBurgerMenu}>
            <CloseBtn className={style.closeBtn} />
            {Links.map((l, i) => (
              <a
                key={i}
                onClick={(e) => togleStyle(e.currentTarget, style.active)}
                href={`/#${l.to}`}
                className={style.link}
              >
                {l.name}
              </a>
            ))}
          </nav>
          {isMobile &&
            createPortal(
              <div className={style.navigationBackground} onClick={togleBurgerMenu}></div>,
              document.getElementsByTagName('body')[0]
            )}
        </>
      )}
      <div className={style.contacts}>
        <a href={`tel:${PHONE_NUMBER}`} className={style.phoneLink}>
          <img src="/icons/phone.svg" className={style.phoneIcon} alt="phoneIcon" />
        </a>
        <a href={INSTAGRAM_LINK} className={style.instLink}>
          <InstagramIcon className={style.instIcon} />
        </a>
        <a href={`tel:${PHONE_NUMBER}`} className={style.phoneNumberLink}>
          {PHONE_NUMBER}
        </a>
        <div className={style.burger} onClick={() => togleBurgerMenu()}>
          {[...Array(BURGER_LINE_COUNT)].map((_e, i) => (
            <div key={i} className={style.burgerLine}></div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
