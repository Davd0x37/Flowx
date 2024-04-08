import { Outlet } from 'react-router-dom';
import AuthenticateLayout from 'app/components/Layouts/AuthenticateLayout';

const AuthenticateView = () => {
  return (
    <AuthenticateLayout>
      <Outlet />
    </AuthenticateLayout>
  );
};

export default AuthenticateView;
