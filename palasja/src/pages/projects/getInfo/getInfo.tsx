import ProjectName from '../../../components/projectName';
import { Code } from './code_en';
import style from './geInfo.module.css';
import { useTranslation } from 'react-i18next';

const GetInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <ProjectName projName='Get Info'/>
      <p>{t('proj.getInfo.desc')}</p>
      <p>{t('proj.getInfo.info')}</p>
      <ul>
        {[...new Array(9)].map((_v, i) => (
          <li>{t(`proj.getInfo.infoList.${i + 1}`)}</li>
        ))}
      </ul>
      <p>{t('proj.getInfo.action')}</p>
      <ul>
        {[...new Array(2)].map((_v, i) => (
          <li>{t(`proj.getInfo.actionList.${i + 1}`)}</li>
        ))}
      </ul>
      <details>
        <summary>GetInfo</summary>
        <pre>{Code}</pre>
      </details>
    </>
  );
};

export default GetInfo;
