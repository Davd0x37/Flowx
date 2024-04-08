import { Outlet } from 'react-router-dom';
import MainLayout from 'app/components/Layouts/MainLayout';

const DefaultView = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default DefaultView;
