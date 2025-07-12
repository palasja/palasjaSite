import { useTranslation } from 'react-i18next';
import style from './langSelect.module.css'

const LangSelect = () => {
  const { t, i18n } = useTranslation();

  return (
    // <ul onClick={(e) => i18n.changeLanguage(e.target.value)}>
    <div className={style.selector}>
      <div className={style.currentLang}>
        <span>{i18n.language}</span>
        <ul className={style.langList} onClick={(e) => i18n.changeLanguage((e.target as HTMLLIElement).innerHTML)}>
          <li>ru</li>
          <li>en</li>
          <li>by</li>
        </ul> 
      </div>
 
    </div>
  )
}

export default LangSelect
