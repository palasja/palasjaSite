import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './languages.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
{
  /* <FontAwesomeIcon icon={faFacebookF} /> */
}
{
  /* <FontAwesomeIcon icon="fa-regular fa-square-b" /> */
}

const Languages = () => {
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <div className={style.language}>
        <h4 className={style.head}>{t('home.cw.lang.language')}</h4>
        <ul>
          {/* <FontAwesomeIcon icon={faSquareB}/> */}
          <li className={style.text}>{t('home.cw.lang.belarus')}</li>
          <li className={style.text}>{t('home.cw.lang.russian')}</li>
          <li className={style.text}>{t('home.cw.lang.english')}</li>
        </ul>
      </div>
    </ContentWrapper>
  );
};

export default Languages;
