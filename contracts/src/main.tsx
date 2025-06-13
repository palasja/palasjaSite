import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Contract from './contract/contract';
import Auth from './auth';
import { AuthProvider } from './hooks/protectedRoute/authProvider';
import { ProtectedRoute } from './hooks/protectedRoute/protectedRoute';
import SignIn from './signIn';
import Logout from './logout';
import Error404 from './404';
import './main.css';
import Act from './acts/act';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
       <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Contract />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Auth />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="logout" element={<Logout />} />
          {/* <Route path="act" element={<Act />} /> */}
          <Route
            path="contract"
            element={
              <ProtectedRoute>
                <Contract />
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
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
