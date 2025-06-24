import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Error404 from './pages/404';
import Home from './pages/home';
import SrvScan from './pages/projects/srcScan/srvScan';
import Header from './components/header';
import './main.css';
import Footer from './components/footer';
import Projects from './pages/projects/projects';
import './i18n';
import GetInfo from './pages/projects/getInfo';
import GusMary from './pages/projects/gusMary';
import Contracts from './pages/projects/contracts';
import Payroll from './pages/projects/payroll/payroll';
import Code from './pages/projects/srcScan/code';
import srvScanCode from './pages/projects/srcScan/code_en';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />}>
          <Route path="srvScan" element={<SrvScan />} >
          {Object.keys(srvScanCode).map((key, i) => 
          //@ts-ignore
            <Route key={i} path={key} element={<Code name={key} code={srvScanCode[key]}/>} />)}
          </Route>
          <Route path="getInfo" element={<GetInfo />} />
          <Route path="gusmary" element={<GusMary />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="payroll" element={<Payroll />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>


  
      <Footer />
      
    </BrowserRouter>
  </StrictMode>
);
