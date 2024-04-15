import { Outlet } from 'react-router-dom';

export const UserView = () => {
  return (
    <div className="relative h-full">
      <Outlet />
    </div>
  );
};
