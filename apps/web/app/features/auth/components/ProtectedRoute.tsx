import { useAuth } from '../hooks/useAuth';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  redirect: string;
};

const ProtectedRoute = ({ children, redirect }: PropsWithChildren<ProtectedRouteProps>) => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
