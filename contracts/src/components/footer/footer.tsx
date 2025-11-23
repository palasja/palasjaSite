import style from './footer.module.css';

const Footer = () => {
  return (
    <footer className={`noprint ${style.footer}`} data-testid="footer">
      <div className={style.content}>Разработка - Якубенко И.А.</div>
    </footer>
  );
};
export default Footer;
