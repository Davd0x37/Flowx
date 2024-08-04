import { Outlet } from 'react-router-dom';

const AuthenticateLayout = () => {
  return (
    <div className="m-auto flex h-screen max-w-lg flex-col justify-center">
      <Outlet />
    </div>
  );
};

export default AuthenticateLayout;
