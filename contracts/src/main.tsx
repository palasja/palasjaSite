import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import style from './main.module.css';

const App = lazy(() => import('./app/app'));
const Act = lazy(() => import('./acts/act'));
const Stats = lazy(() => import('./stats'));
const SoftPrompt = lazy(() => import('./softPrompt'));

import Auth from './auth/login';
import { ProtectedRoute } from './hooks/protectedRoute';
import Error404 from './404';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Logout from './auth/logout';
import Footer from './components/footer';
import Header from './components/header';
import Loading from './components/loading';
import { useAppSelector } from './redux/hooks';
import { getIsLoading } from './redux/slices/authSlice';
import Services from './services';
import Contracts from './contracts';
import Personals from './personal';

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
              {/* <Route
                path="org"
                element={
                  <ProtectedRoute>
                    <App />
                  </ProtectedRoute>
                }
              >
              </Route> */}
              <Route path="org">
                {/* <ProtectedRoute> */}
                <Route index element={<App />} />
                <Route element={<App />}>
                  <Route path=":orgID/servise" element={<Services />} />
                  <Route path=":orgID/contracts" element={<Contracts />} />
                  <Route path=":orgID/personals" element={<Personals />} />
                  <Route path=":orgID/act" element={<Act />} />
                </Route>
                {/* </ProtectedRoute> */}

                {/* <Route path="settings" element={<Services />} /> */}
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
