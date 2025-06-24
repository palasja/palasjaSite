import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './languages.module.css';
import { useTranslation } from 'react-i18next';

const Languages = () => {
  const { t } = useTranslation();
  return(
    <ContentWrapper>
      <h4>{t('home.cw.lang.language')}</h4>
      <ul>
        <li>{t('home.cw.lang.belarus')}</li>
        <li>{t('home.cw.lang.russian')}</li>
        <li>{t('home.cw.lang.english')}</li>
      </ul>
    </ContentWrapper>
  );
}

export default Languages;