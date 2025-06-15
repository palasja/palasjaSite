import { Link, useLocation } from 'react-router';
import { Outlet } from 'react-router';
import style from './projects.module.css';
import srvScanCode from './srcScan/code_en';
import { useState } from 'react';


const Projects = () => {
  const reg = new RegExp(/SrvScan/i);
  const location = useLocation();

  return (
    <>
      <div className={style.container}>
        <nav className={style.nav}>
          <Link to="srvScan">SrvScan</Link>
          {
          reg.test(location.pathname) && 
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
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Projects;
