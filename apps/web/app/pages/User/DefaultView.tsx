import { Outlet } from 'react-router-dom';

const UserDefault = () => {
  return (
    <div className="relative h-full">
      <Outlet />
    </div>
  );
};

export default UserDefault;
