import { Navigate } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'
import { useAuth } from '~/hooks/useAuth'

type ProtectedRouteProps = {
  redirect: string
}

const ProtectedRoute = ({ children, redirect }: PropsWithChildren<ProtectedRouteProps>) => {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return <Navigate to={redirect} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
