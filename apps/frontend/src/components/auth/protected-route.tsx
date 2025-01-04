import type { PropsWithChildren } from 'react'
import { Navigate } from '@tanstack/react-router'
import { useAuth } from '~/hooks/use-auth'

interface ProtectedRouteProps {
  redirect: string
}

function ProtectedRoute({
  children,
  redirect,
}: PropsWithChildren<ProtectedRouteProps>) {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return <Navigate replace to={redirect} />
  }

  return children
}

export default ProtectedRoute
