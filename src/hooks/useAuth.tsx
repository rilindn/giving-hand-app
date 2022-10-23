import { useContext } from 'react';

import { AuthContext } from 'contexts/AuthContext';
import { IUser } from 'interfaces/user';

const useAuth: any = () => {
  const context = useContext<IAuthContext | null>(AuthContext);

  if (context === undefined) {
    throw new Error('AuthContext was used outside of its Provider');
  }

  return context;
};

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

export default useAuth;
