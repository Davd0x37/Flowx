import { Outlet } from 'react-router-dom';
import MainLayout from 'app/components/Layouts/MainLayout';

export const RootView = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
