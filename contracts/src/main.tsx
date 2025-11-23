import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './main.css';

import App from './app/app';
import Auth from './auth/login';
import { ProtectedRoute } from './hooks/protectedRoute';
import Error404 from './404';
import Act from './acts/act';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Stats from './stats';
import Logout from './auth/logout';
import SoftPrompt from './softPrompt';
import Footer from './components/footer';
import Header from './components/header';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="wrapper">{children}</div>;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store()}>
      <Wrapper>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth isSignin={false} />} />
            <Route path="login" element={<Auth isSignin={false} />} />
            <Route path="signin" element={<Auth isSignin={true} />} />
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
                  <SoftPrompt />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
      <Footer />
    </Provider>
  </StrictMode>
);
