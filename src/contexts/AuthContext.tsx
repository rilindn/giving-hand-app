import { Client } from 'api/ApiBase';
import { loggedUser } from 'api/ApiMethods';
import React, { createContext, useState, useEffect } from 'react';

import { IUser } from 'interfaces/user';

const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authData, setAuthData] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loadAuthData = async () => {
    try {
      const token = localStorage.getItem('AuthToken');
      if (token) {
        Client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const authData: IUser = await loggedUser();
        setAuthData(authData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (data: SignInResponse) => {
    if (data.token) {
      localStorage.setItem('AuthToken', data?.token);
      Client.defaults.headers.common['Authorization'] = 'Bearer ' + data?.token;
    }
    await loadAuthData();
  };

  const handleSignOut = async () => {
    localStorage.setItem('AuthToken', '');
    setAuthData(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authData, loading, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

interface Props {
  children: React.ReactNode;
}

interface SignInResponse {
  token: string;
  user: IUser;
}

interface IAuthContext {
  isAuthenticated: boolean;
  authData: IUser | null;
  loading: boolean;
  handleSignIn: (data: SignInResponse) => void;
  handleSignOut: () => void;
}

export { AuthContext, AuthContextProvider };
