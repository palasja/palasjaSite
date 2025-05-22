import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Act from './act/act';
import App from './App';
import Auth from './auth';
import { AuthProvider } from './authProvider';
import { ProtectedRoute } from './protectedRoute';
import SignIn from './signIn';
import Logout from './logout';
import Error404 from './404';
import Home from './home';
import CW from './cw';
import Project from './project';
import Header from './header';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cw" element={<CW />} />
          <Route path="/project" element={<Project />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route
            path="/act/:orgId/:month"
            element={
              <ProtectedRoute>
                <Act />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
