import { Outlet } from 'react-router-dom';
import AuthenticateLayout from '@/components/Layouts/AuthenticateLayout';

export const AuthenticateView = () => {
  return (
    <AuthenticateLayout>
      <Outlet />
    </AuthenticateLayout>
  );
};
