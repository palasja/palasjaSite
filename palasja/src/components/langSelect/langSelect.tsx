import { useTranslation } from 'react-i18next';
import style from './langSelect.module.css';

const LangSelect = () => {
  const { t, i18n } = useTranslation();
  let a: MouseEventInit;
  return (
    <div className={style.nav}>
      <span className={style.curLanguage}>{i18n.language}</span>
      <ul
        className={style.language}
        onClick={(e) => {
          if (e.target instanceof HTMLLIElement) {
            i18n.changeLanguage(e.target.innerHTML);
          }
        }}
      >
        <li>ru</li>
        <li>en</li>
        <li>by</li>
      </ul>
    </div>
  );
};

export default LangSelect;
