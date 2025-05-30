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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />}>
          <Route path="srvScan" element={<SrvScan />} />
          <Route path="getInfo" element={<GetInfo />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
