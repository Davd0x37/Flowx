import { Outlet } from 'react-router-dom';

const UserView = () => {
  return (
    <div className="relative h-full">
      <Outlet />
    </div>
  );
};

export { UserView as Component };
