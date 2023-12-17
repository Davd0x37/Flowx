import { Outlet } from 'react-router-dom';

type Props = {};

const ServiceList = (props: Props) => {
  return (
    <div>
      ServiceList
      <Outlet />
    </div>
  );
};

export default ServiceList;
