import { useTranslation } from 'react-i18next';
import style from './footer.module.css';
import Conteiner from '../../conteiner';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <Conteiner>
        <p>
          {t('footer.desPos')} {t('footer.desName')}
        </p>
        <p>
          {t('footer.devPos')} {t('footer.devName')}
        </p>
      </Conteiner>

    </footer>
  );
};
export default Footer;
