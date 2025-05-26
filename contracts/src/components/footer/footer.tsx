import { useTranslation } from 'react-i18next';
import style from './footer.module.css';

const Footer = () => {
  const { t } = useTranslation();
  return (
  <>
    <p>{t("footer.desPos")} {t("footer.desName")}</p>
    <p>{t("footer.devPos")} {t("footer.devName")}</p>
  </>
  )
}
export default Footer;