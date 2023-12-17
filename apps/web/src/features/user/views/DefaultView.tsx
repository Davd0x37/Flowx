import { Outlet } from 'react-router-dom';

type Props = {};

const UserDefault = (props: Props) => {
  return (
    <div className="relative h-full">
      <Outlet />
    </div>
  );
};

export default UserDefault;
