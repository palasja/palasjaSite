import { INSTAGRAM_LINK, PHONE_NUMBER } from '../../helpers/constants';
import style from './footer.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
const Links: { to: string; name: string }[] = [
  { to: 'about', name: 'Обо мне' },
  { to: 'advantage', name: 'Преимущества' },
  { to: 'jobs', name: 'Мои работы' },
  { to: 'services', name: 'Услуги' },
  { to: 'feedback', name: 'Отзывы' },
];
const Footer = () => {
  return (
    <footer className={style.footer}>
      <a href="/#maria" className={style.logoLink}>
        <img src="/gusMaryLogo.svg" alt="Gus Mary Hair Logo" className={style.logo} />
        <img src="/gusMaryLogoSmall.svg" alt="Gus Mary Hair Logo" className={style.logoSmall} />
      </a>
      <nav id="navPanel" className={style.navigation}>
        <a href={`/`} className={style.link}>
          Главная
        </a>
        {Links.map((l, i) => (
          <a key={i} href={`/#${l.to}`} className={style.link}>
            {l.name}
          </a>
        ))}
      </nav>
      <div className={style.contacts}>
        <a href={`tel:${PHONE_NUMBER}`} className={style.phoneNumberLink}>
          {PHONE_NUMBER}
        </a>
        <a href={INSTAGRAM_LINK} className={style.instLink}>
          <InstagramIcon className={style.instIcon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
