import { Outlet } from 'react-router-dom';

const ErrorLayout = () => {
  return (
    <div className="flex h-screen w-screen flex-row gap-6 font-sans text-base antialiased transition-colors">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ErrorLayout;
