import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './app/app';
import Auth from './auth';
import { ProtectedRoute } from './hooks/protectedRoute';
import SignIn from './signIn';
import Logout from './logout';
import Error404 from './404';
import './main.css';
import Act from './acts/act';
import { store } from './redux/store';
import { Provider } from 'react-redux';

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
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
