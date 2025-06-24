import { useTranslation } from 'react-i18next';
import style from './footer.module.css';
import { ContentContainer } from '../containers/contentContainer';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <ContentContainer>
        <p>
          {t('footer.desPos')} {t('footer.desName')}
        </p>
        <p>
          {t('footer.devPos')} {t('footer.devName')}
        </p>
      </ContentContainer>

    </footer>
  );
};
export default Footer;
