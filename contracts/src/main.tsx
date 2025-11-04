import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './app/app';
import Auth from './auth/login';
import { ProtectedRoute } from './hooks/protectedRoute';
import Error404 from './404';
import './main.css';
import Act from './acts/act';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Stats from './stats';
import Logout from './auth/logout';
import SignIn from './auth/signIn';
import SoftInfo from './softInfo';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="login" element={<Auth />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="logout" element={<Logout />} />
          <Route
            path="contract"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route
            path="act"
            element={
              <ProtectedRoute>
                <Act />
              </ProtectedRoute>
            }
          />
          <Route
            path="stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route
            path="softinfo"
            element={
              <ProtectedRoute>
                <SoftInfo />
              </ProtectedRoute>
            }
          />          
          
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
