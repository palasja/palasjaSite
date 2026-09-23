import { useTranslation } from 'react-i18next';
import style from './langSelect.module.css';

const LangSelect = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className={style.lang}>
      <span className={style.curLanguage}>{i18n.language}</span>
      <ul
        className={style.language}
        onClick={(e) => {
          if (e.target instanceof HTMLLIElement) {
            i18n.changeLanguage(e.target.innerHTML);
            document.body.click();
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
