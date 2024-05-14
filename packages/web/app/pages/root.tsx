import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/Layouts/MainLayout';

export const RootView = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
