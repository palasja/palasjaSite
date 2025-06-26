import { Link, useLocation } from 'react-router';
import { Outlet } from 'react-router';
import style from './projects.module.css';
import srvScanCode from './srcScan/code_en';
import { t } from 'i18next';
import { splitLineGetParagragh } from '../../helpers/heper';


const Projects = () => {
  const srvScanReg = new RegExp(/SrvScan/i);
  const projectsReg = new RegExp(/projects$/i);
  
  const location = useLocation();

  return (
    <>
      <div className={style.container}>
        <nav className={style.nav}>
          <Link to="srvScan">SrvScan</Link>
          {
          srvScanReg.test(location.pathname) && 
          <div className={style.srvNav}>
            {Object.keys(srvScanCode).map((key, i) => <Link className={style.link} key={i} to={`srvScan/${key}`}>{key}</Link>)}
          </div>
          }
          <Link to="getInfo">GetInfo</Link>
          <Link to="gusmary">GusMary</Link>
          <Link to="contracts">Contracts</Link>
          <Link to="payroll">Payroll</Link>
        </nav>
        <main>
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
    </>
  );
};

export default Projects;
