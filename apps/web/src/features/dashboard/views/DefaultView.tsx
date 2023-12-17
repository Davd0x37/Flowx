import { Outlet } from 'react-router-dom';

import MainLayout from 'app/components/layouts/MainLayout';

type Props = {};

const DefaultView = (props: Props) => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default DefaultView;
