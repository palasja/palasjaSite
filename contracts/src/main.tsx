import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Act from './contract/act';
import Contract from './contract/contract';
import Auth from './contract/auth';
import { AuthProvider } from './contract/hooks/protectedRoute/authProvider';
import { ProtectedRoute } from './contract/hooks/protectedRoute/protectedRoute';
import SignIn from './contract/signIn';
import Logout from './contract/logout';
import Error404 from './pages/404';
import Home from './pages/home';
import CW from './pages/cw';
import SrvScan from './pages/projects/srcScan/srvScan';
import Header from './components/header';
import './main.css';
import Footer from './components/footer';
import Projects from './pages/projects/projects';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Auth />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="logout" element={<Logout />} />
          <Route path="cw" element={<CW />} />
          <Route path="projects" element={<Projects />} >
            <Route path="srvScan" element={<SrvScan />} />
          </Route>
          <Route
            path="contract"
            element={
              <ProtectedRoute>
                <Contract />
              </ProtectedRoute>
            }
          />
          <Route
            path="act/:orgId/:month"
            element={
              <ProtectedRoute>
                <Act />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
