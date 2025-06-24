import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './skils.module.css';
import { useTranslation } from 'react-i18next';

const Skils = () => {
  const { t } = useTranslation();
  return(
    <ContentWrapper>
      <h4>{t('home.cw.skils.skils')}</h4>
          <ul>
            <li>
              <span>{t('home.cw.skils.languages')}:</span> SQL, JS, C#, SQL, Typescript, CSS, HTML5,
              Node.js, Batch
            </li>
            <li>
              <span>{t('home.cw.skils.frameworks')}:</span> Express, ASP.NET Core, React
            </li>
            <li>
              <span>{t('home.cw.skils.tools')}:</span> Enterprise Manager, MS Office, IBExpert, Vmware
              Workstation, VSphere, Sequelize, Git, Vite
            </li>
            <li>
              <span>{t('home.cw.skils.platforms')}:</span> Visual Studio, Visual Studio Code
            </li>
            <li>
              <span>{t('home.cw.skils.softSkils')}:</span> Self-organization, Stress resilience, Problem
              solving, Adaptability and flexibility
            </li>
          </ul>
    </ContentWrapper>
  );
}

export default Skils