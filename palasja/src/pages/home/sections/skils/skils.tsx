import { ContentWrapper } from '../../../../components/containers/contentContainer';
import style from './skils.module.css';
import { useTranslation } from 'react-i18next';
import set from 'assets/icons/settings.png';
import head from 'assets/icons/head.png';
import wrench from 'assets/icons/wrench.png';
import win from 'assets/icons/window.png';
import code from 'assets/icons/code.png';

const Skils = () => {
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <div className={style.skils}>
        <h4 className={style.head}>{t('home.cw.skils.skils')}</h4>
        <div>
          <div className={style.inner}>
            <img src={code} className={style.img}></img>
            <span className={style.skillName}>{t('home.cw.skils.languages')}: </span> SQL, JS, C#, SQL, Typescript, CSS, HTML5,
            Node.js, Batch
          </div>
          <div className={style.inner}>
            <img src={set} className={style.img}></img>
            <span className={style.skillName}>{t('home.cw.skils.frameworks')}: </span> Express, ASP.NET Core, React
          </div>
          <div className={style.inner}>
            <img src={wrench} className={style.img}></img>
            <span className={style.skillName}>{t('home.cw.skils.tools')}: </span> Enterprise Manager, MS Office, IBExpert, Vmware
            Workstation, VSphere, Sequelize, Git, Vite
          </div>
          <div className={style.inner}>
            <img src={win} className={style.img}></img>
            <span className={style.skillName}>{t('home.cw.skils.platforms')}: </span> Visual Studio, Visual Studio Code
          </div>
          <div className={style.inner}>
            <img src={head} className={style.img}></img>
            <span className={style.skillName}>{t('home.cw.skils.softSkils')}: </span> Self-organization, Stress resilience,
            Problem solving, Adaptability and flexibility
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Skils;
