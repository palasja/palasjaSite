import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchLogOut, fetchСheckAuth } from './api';

export const AuthContext = createContext<{
  isAuth: boolean;
  onLogin: () => void;
  onLogout: () => void;
}>({
  isAuth: false,
  onLogin: () => {},
  onLogout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    // useEffect(() => {
  //   const checkAuth = () => {
  //     fetchСheckAuth().then((status) => {
  //       if(status == 200){setIsAuth(true); console.log("aaa"+isAuth);setIsAuth(true);} else {setIsAuth(false);};
  //       console.log("ссс"+isAuth);
  //       });
  //     };
  //     checkAuth();
  // },[]);
  
  const handleLogin = async () => {
    setIsAuth(true);
    navigate('/app');
  };

  const handleLogout = () => {
    fetchLogOut().then((status) => {
      if(status == 200){
        setIsAuth(false);
        navigate('/');
      }
      });
  };

  const value = {
    isAuth: isAuth,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
