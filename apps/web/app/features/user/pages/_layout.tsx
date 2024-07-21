import { Outlet } from 'react-router-dom';

const UserView = () => {
  return (
    <div className="p4 relative h-full md:p-10">
      <Outlet />
    </div>
  );
};

export { UserView as Component };
