import { useAuthCheckSession, useAuthLogoutMutation } from '../hooks/useAuthMutation';
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react';
import useUserStore from '@/features/user/stores/user';
import useStorage from '@/hooks/useStorage';
import { UserType } from '@flowx/api_types/models/user';

type AuthProviderProps = {
  localStateKey?: string;
};

type AuthProviderState = {
  user: Record<string, unknown>;
  isAuthenticated: boolean;
  login: (data: Record<string, unknown>) => void;
  logout: () => void;
  checkSession: (onSuccess?: () => void, onError?: (errorData: Error) => void) => void;
};

const initialState: AuthProviderState = {
  user: {},
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
  checkSession: () => null,
};

export const AuthContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({
  localStateKey = 'lastLoggedDate',
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const authLogout = useAuthLogoutMutation();
  const authCheck = useAuthCheckSession();

  const { changeName, changeStatus } = useUserStore();

  const { storedValue: user, setValue: setUser } = useStorage<Partial<UserType>>(localStateKey, {});
  const [isAuthenticated, setIsAuthenticated] = useState(!!user.email);

  const updateUserData = (data: Partial<UserType>) => {
    const userName = `${data.firstName || ''} ${data.lastName || ''}`;

    changeName(userName);
    changeStatus('active');
  };

  // @TODO: move login mutation here or keep it in login page?
  const login = (credentials: Partial<UserType>) => {
    // Store user email or other details in local/global storage
    setUser(credentials);

    updateUserData(credentials);

    // Toggle authenticated flag, it will trigger rerender and show all protected routes
    setIsAuthenticated(true);
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
        console.log('error logging out', error, variables);
      },
    });
  };

  const checkSession = (onSuccess?: () => void, onError?: (errorData: Error) => void) => {
    authCheck.mutate(undefined, {
      onSuccess: () => {
        onSuccess?.();

        // Update user data if session is valid
        updateUserData(user);
      },

      onError(errorData) {
        onError?.(errorData);

        // Clear user data from storage
        setUser({});

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
