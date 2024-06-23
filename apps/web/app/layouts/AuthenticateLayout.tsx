import { Outlet } from 'react-router-dom';

const AuthenticateLayout = () => {
  return (
    <div className="flex h-screen w-screen font-sans text-base antialiased transition-colors">
      <Outlet />
    </div>
  );
};

export default AuthenticateLayout;
