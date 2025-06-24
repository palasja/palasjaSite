import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './education.module.css';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <h4>{t('home.cw.education.education')}</h4>
       <div>
         <div>
           <p>{t('home.cw.education.univerrsity')}</p>
           <p>{t('home.cw.education.hightQality')}</p>
         </div>
         <div>{t('home.cw.education.universityDate')}</div>
       </div>
       <div>
         <div>
           <p>{t('home.cw.education.college')}</p>
           <p>{t('home.cw.education.specialization')}</p>
         </div>
         <div>{t('home.cw.education.collegeDate')}</div>
       </div>
    </ContentWrapper>
  );
}

export default Education