import { Outlet } from 'react-router-dom';

const ServicesView = () => {
  return (
    <div>
      SERVICESLIST
      <Outlet />
    </div>
  );
};

export { ServicesView as Component };
