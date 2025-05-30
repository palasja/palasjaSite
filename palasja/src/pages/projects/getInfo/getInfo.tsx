import { Code } from './code_en';
import style from './geInfo.module.css';
import { useTranslation } from 'react-i18next';

const GetInfo = () => {
  const { t } = useTranslation();
  return(
    <>
  <p>{t("proj.getInfo.desc")}</p>
  <p>{t("proj.getInfo.info")}</p>
      <ul>
        <li>{t('proj.getInfo.infoList.1')}</li>
        <li>{t('proj.getInfo.infoList.2')}</li>
        <li>{t('proj.getInfo.infoList.3')}</li>
        <li>{t('proj.getInfo.infoList.4')}</li>
        <li>{t('proj.getInfo.infoList.5')}</li>
        <li>{t('proj.getInfo.infoList.6')}</li>
        <li>{t('proj.getInfo.infoList.7')}</li>
        <li>{t('proj.getInfo.infoList.8')}</li>
        <li>{t('proj.getInfo.infoList.9')}</li>
      </ul>
      <p>{t("proj.getInfo.action")}</p>
      <ul>
        <li>{t('proj.getInfo.actionList.1')}</li>
        <li>{t('proj.getInfo.actionList.2')}</li>
      </ul>
  <details>
    <summary>GetInfo</summary>
    <pre>{Code}</pre>
  </details>
</>
  );
};

export default GetInfo;
