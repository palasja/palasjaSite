import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import style from './main.module.css';

const App = lazy(() => import('./app/app'));
const Act = lazy(() => import('./acts/act'));
const Stats = lazy(() => import('./stats'));
const SoftPrompt = lazy(() => import('./softPrompt'));
const Services = lazy(() => import('./services'));
const Contracts = lazy(() => import('./contracts'));
const Personals = lazy(() => import('./personal'));
const Error404 = lazy(() => import('./404'));
const Loading = lazy(() => import('./components/loading'));
const Logout = lazy(() => import('./auth/logout'));
const Auth = lazy(() => import('./auth/login'));
// import Auth from './auth/login';
import { ProtectedRoute } from './hooks/protectedRoute';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import Logout from './auth/logout';
import Footer from './components/footer';
import Header from './components/header';
// import Loading from './components/loading';
import { useAppSelector } from './redux/hooks';
import { getIsLoading } from './redux/slices/authSlice';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.wrapper}>{children}</div>;
};

const Loader = () => {
  const isApiLoading = useAppSelector(getIsLoading);
  return isApiLoading && <Loading />;
};
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store()}>
      <Wrapper>
        <BrowserRouter>
          <Loader />
          <Header />
          <div className={style.content}>
            <Routes>
              <Route path="/" element={<Auth isSignin={false} />} />
              <Route path="login" element={<Auth isSignin={false} />} />
              <Route path="signin" element={<Auth isSignin={true} />} />
              <Route path="logout" element={<Logout />} />
              <Route path="org">
                <Route index element={<App />} />
                <Route element={<App />}>
                  <Route
                    path=":orgID/servise"
                    element={
                      <ProtectedRoute>
                        <Services />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":orgID/contracts"
                    element={
                      <ProtectedRoute>
                        <Contracts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":orgID/personals"
                    element={
                      <ProtectedRoute>
                        <Personals />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":orgID/act"
                    element={
                      <ProtectedRoute>
                        <Act />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Route>
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
          </div>
        </BrowserRouter>
      </Wrapper>
      <Footer />
    </Provider>
  </StrictMode>
);
