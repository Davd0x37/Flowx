import type { UserType } from '@flowx/api_types/models/user'
import { type PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react'
import { useAuthCheckSession, useAuthLogoutMutation } from '~/hooks/useAuthMutation'
import useStorage from '~/hooks/useStorage'
import useUserStore from '~/stores/user'

type AuthProviderProps = {
  localStateKey?: string
}

export type AuthProviderState = {
  user: Record<string, unknown>
  isAuthenticated: boolean
  login: (data: Record<string, unknown>) => void
  logout: (onSettled: () => void) => void
  checkSession: (onSuccess?: () => void, onError?: (errorData: Error) => void) => void
}

export const initialState: AuthProviderState = {
  user: {},
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
  checkSession: () => null,
}

export const AuthContext = createContext<AuthProviderState>(initialState)

export function AuthProvider({
  localStateKey = 'lastLoggedDate',
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const authLogout = useAuthLogoutMutation()
  const authCheck = useAuthCheckSession()

  const { changeName, changeStatus } = useUserStore()

  const { storedValue: user, setValue: setUser } = useStorage<Partial<UserType>>(localStateKey, {})
  const [isAuthenticated, setIsAuthenticated] = useState(!!user.email)

  const updateUserData = (data: Partial<UserType>) => {
    const userName = `${data.firstName || ''} ${data.lastName || ''}`

    changeName(userName)

    if (data.status) {
      changeStatus(data.status)
    }
  }

  // @TODO: move login mutation here or keep it in login page?
  const login = (credentials: Partial<UserType>) => {
    // Store user email or other details in local/global storage
    setUser(credentials)

    updateUserData(credentials)

    // Toggle authenticated flag, it will trigger rerender and show all protected routes
    setIsAuthenticated(true)
  }

  const logout = (onSettled = () => {}) => {
    authLogout.mutate(undefined, {
      onSuccess: () => {
        // Show dialog/toast
      },

      onSettled: () => {
        setIsAuthenticated(false)
        onSettled()
      },

      onError(error, variables) {
        console.log('error logging out', error, variables)
      },
    })
  }

  const checkSession = (onSuccess?: () => void, onError?: (errorData: Error) => void) => {
    authCheck.mutate(undefined, {
      onSuccess: () => {
        onSuccess?.()

        // Update user data if session is valid
        updateUserData(user)
      },

      onError(errorData) {
        onError?.(errorData)

        // Clear user data from storage
        setUser({})

        // Redirect user to auth page
        setIsAuthenticated(false)
      },
    })
  }

  // @TODO: Check if user was inactive for few days and redirect to auth page
  // biome-ignore lint/correctness/useExhaustiveDependencies: checkSession changes on every re-render
  useEffect(() => {
    checkSession()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: fix later
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      checkSession,
    }),
    [user.email, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
