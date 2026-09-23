import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './languages.module.css';
import { useTranslation } from 'react-i18next';
import r from 'assets/icons/r.png';
import b from 'assets/icons/b.png';
import e from 'assets/icons/e.png';

//  <img src={code} className={style.img}></img>

const Languages = () => {
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <div className={style.language}>
        <h4 className={style.head}>{t('home.cw.lang.language')}</h4>
        <div>
          <div className={style.inner}>
            <img src={b} className={style.img}></img>
            <div>{t('home.cw.lang.belarus')}</div>
          </div>
          <div className={style.inner}>
            <img src={r} className={style.img}></img>
            <div>{t('home.cw.lang.russian')}</div>
          </div>
          <div className={style.inner}>
            <img src={e} className={style.img}></img>
            <div>{t('home.cw.lang.english')}</div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Languages;
