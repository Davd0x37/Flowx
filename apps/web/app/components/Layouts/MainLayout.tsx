import { PropsWithChildren } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-screen flex-row gap-6 font-sans text-base antialiased transition-colors">
      <Sidebar openSidebar className="flex-1" />

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default MainLayout;
