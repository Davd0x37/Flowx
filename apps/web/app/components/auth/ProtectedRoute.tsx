import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
