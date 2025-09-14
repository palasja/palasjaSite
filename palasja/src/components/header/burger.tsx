import { slide as Menu } from 'react-burger-menu'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router'
import style from './burger.module.css';
import { FormEvent, useEffect } from 'react';

const Burger = () => {
  const { t, i18n } = useTranslation();
  return(
      <>
  <Menu 
  className={style.burgerMenu}
  right burgerButtonClassName={style.burgerButton }
  crossButtonClassName={style.burgerBtn}
   overlayClassName={style.burgerBackGround}
  onStateChange={(state) => {
    state.isOpen ? document.body.classList.add(style.lockScroll) : document.body.classList.remove(style.lockScroll);
}}
   >
        <NavLink className={style.link} to={'/'}>
      {t('menu.home')}
    </NavLink>
    <NavLink className={style.link} to={'projects'}>
      {t('menu.project')}
    </NavLink>
  </Menu>
</>
  )
}

export default Burger;