import type { User } from '@flowx/api'
import { createContext, type PropsWithChildren, useMemo, useState } from 'react'
import { useAuthLogoutMutation } from '~/api/auth/use-auth-mutation'
import useStorage from '~/hooks/use-storage'
import useUserStore from '~/stores/user'

interface AuthProviderProps {
  localStateKey?: string
}

interface AuthProviderState {
  isAuthenticated: boolean
  login: (data: Record<string, unknown>) => void
  logout: (onSettled: () => void) => void
  user: Record<string, unknown>
}

const initialState: AuthProviderState = {
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
  user: {},
}

const AuthContext = createContext<AuthProviderState>(initialState)

function AuthProvider({
  children,
  localStateKey = 'lastLoggedDate',
}: PropsWithChildren<AuthProviderProps>) {
  const authLogout = useAuthLogoutMutation()

  const { changeName, changeStatus } = useUserStore()

  const { setValue: setUser, storedValue: user } = useStorage<Partial<User>>(
    localStateKey,
    {},
  )
  const [isAuthenticated, setIsAuthenticated] = useState(!!user.email)

  const updateUserData = (data: Partial<User>) => {
    if (!data.username) return

    changeName(data.username)

    if (data.status) {
      changeStatus(data.status)
    }
  }

  // @TODO: move login mutation here or keep it in login page?
  const login = (credentials: Partial<User>) => {
    // Store user email or other details in local/global storage
    setUser(credentials)

    updateUserData(credentials)

    // Toggle authenticated flag, it will trigger rerender and show all protected routes
    setIsAuthenticated(true)
  }

  const logout = (onSettled?: () => void) => {
    authLogout.mutate(undefined, {
      onError(error, variables) {
        console.log('error logging out', error, variables)
      },

      onSettled: () => {
        setIsAuthenticated(false)
        onSettled?.()
      },

      onSuccess: () => {
        // Show dialog/toast
      },
    })
  }

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      user,
    }),
    [user.email, isAuthenticated],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

export type { AuthProviderState }

export { AuthContext, initialState as AuthInitialState, AuthProvider }