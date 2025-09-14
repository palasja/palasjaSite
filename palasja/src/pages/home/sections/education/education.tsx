import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './education.module.css';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <div className={style.education}>
        <h4 className={style.head_}>{t('home.cw.education.education')}</h4>
        <div className={style.innerContainer}>
          <div className={style.inner}>
            <div className={style.date}>{t('home.cw.education.collegeDate')}</div>
            <div>
              <p className={style.specialization}>{t('home.cw.education.specialization')}</p>
              <p>{t('home.cw.education.college')}</p>
            </div>
          </div>
          <div className={style.inner}>
            <div className={style.date}>{t('home.cw.education.universityDate')}</div>
            <div>
              <p className={style.specialization}>{t('home.cw.education.hightQality')}</p>
              <p>{t('home.cw.education.univerrsity')}</p>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Education;
