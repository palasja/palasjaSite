import { Link, useLocation } from 'react-router';
import { Outlet } from 'react-router';
import style from './projects.module.css';
import srvScanCode from './srcScan/code_en';
import { t } from 'i18next';
import { splitLineGetParagragh } from '../../helpers/heper';
import { ContentContainer } from '../../components/containers/contentContainer';



const Projects = () => {
  const srvScanReg = new RegExp(/SrvScan/i);
  const projectsReg = new RegExp(/projects$/i);
  
  const location = useLocation();

  return (
    <>
      <ContentContainer>
      <div className={style.container}>
        <nav className={style.nav}>
          <Link className={style.linkBlue} to="srvScan">SrvScan</Link>
          {
          srvScanReg.test(location.pathname) && 
          <div className={style.srvNav}>
            {Object.keys(srvScanCode).map((key, i) => <Link className={style.linkBlue} key={i} to={`srvScan/${key}`}>{key}</Link>)}
          </div>
          }
          <Link className={style.linkBlue} to="getInfo">GetInfo</Link>
          <Link className={style.linkBlue} to="gusmary">GusMary</Link>
          <Link className={style.linkBlue} to="contracts">Contracts</Link>
          <Link className={style.linkBlue} to="payroll">Payroll</Link>
        </nav>
        <main className={style.test}>
          { projectsReg.test(location.pathname) ? 
          <>
            <h3>Проекты</h3>
            <article>
              <Link to="srvScan">SrvScan</Link>
              <p>{t('home.projects.srvScan.desc1')}</p>
              <p>{t('home.projects.srvScan.desc2')}</p>
            </article>
            <article>
              <Link to="getInfo">GetInfo</Link>
              <p>{t('home.projects.getInfo.desc1')}</p>
              <p>{t('home.projects.getInfo.desc2')}</p>
            </article>
            <article>
              <Link to="gusmary">GusMary</Link>
              {splitLineGetParagragh(t('home.projects.gusMary.desc'))}
            </article>
            <article>
              <Link to="contracts">Contracts</Link>
              {splitLineGetParagragh(t('home.projects.contracts.desc'))}
            </article>
            <article>
              <Link to="payroll">Payroll</Link>
              {splitLineGetParagragh(t('home.projects.payroll.desc'))}
            </article>
          </>
          :
          <Outlet />
          }             
        </main>
      </div>
          </ContentContainer>
    </>
  );
};

export default Projects;
