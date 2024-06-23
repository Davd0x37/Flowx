import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  useAuthCheckSession,
  useAuthLoginMutation,
  useAuthLogoutMutation,
} from '@/hooks/useAuthMutation';
import useStorage from '@/hooks/useStorage';
import { UserCredentials } from '@/models/userForm';
import { ApiResponseWrapper } from '@flowx/shared/types/response';

type AuthProviderProps = {
  localStateKey?: string;
};

type loginCallbackArgs = {
  credentials: UserCredentials;
  onSuccess: (data: Record<string, unknown>) => void;
  onError: (error: Error, variables: Record<string, unknown>) => void;
};

type AuthProviderState = {
  user: Record<string, unknown>;
  isAuthenticated: boolean;
  login: (args: loginCallbackArgs) => void;
  logout: () => void;
  checkSession: () => void;
};

const initialState: AuthProviderState = {
  user: {},
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
  checkSession: () => null,
};

const AuthContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({
  localStateKey = 'lastLoggedDate',
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const authLogin = useAuthLoginMutation();
  const authLogout = useAuthLogoutMutation();
  const authCheck = useAuthCheckSession();

  const { storedValue: user, setValue: setUser } = useStorage<Record<string, unknown>>(
    localStateKey,
    {},
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!user.email);

  const login = ({ credentials, onSuccess, onError }: loginCallbackArgs) => {
    authLogin.mutate(credentials, {
      onSuccess: (data) => {
        const { status } = data as ApiResponseWrapper;

        if (status === 'Success') {
          // Store user email or other details in local/global storage
          setUser({ email: credentials.email });

          // Toggle authenticated flag, it will trigger rerender and show all protected routes
          setIsAuthenticated(true);

          // Pass received data to callback function
          onSuccess(data as Record<string, unknown>);
        }
      },

      onError,
    });
  };

  const logout = () => {
    authLogout.mutate(undefined, {
      onSuccess: () => {
        // Show dialog/toast
      },

      onSettled: () => {
        setIsAuthenticated(false);
      },

      onError(error, variables) {
        console.error('error logging out', error, variables);
      },
    });
  };

  const checkSession = () => {
    authCheck.mutate(undefined, {
      onSuccess: () => {
        // @TODO: check if user session is still active, if not redirect to auth page
      },

      onError(error, variables) {
        console.error('error checking session', error, variables);

        // Redirect user to auth page
        setIsAuthenticated(false);
      },
    });
  };

  // @TODO: Check if user was inactive for few days and redirect to auth page
  useEffect(() => {
    checkSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      checkSession,
    }),
    [user.email, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};
