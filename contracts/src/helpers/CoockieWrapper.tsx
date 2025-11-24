import { CookiesProvider, useCookies } from 'react-cookie';
type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const CoockieWrapper = ({ children }: ProtectedRouteProps) => {
  return <CookiesProvider defaultSetOptions={{ path: '/' }}>{children}</CookiesProvider>;
};
