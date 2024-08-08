import { SidebarLinkGroup } from './index';
import { type HTMLAttributes } from 'react';
import { Profile } from '@/components/profile';
import { SearchBar } from '@/components/search';
import { FEATURE_ROUTES } from '@/config/routes';
import { cn } from '@/utils/classNames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  openSidebar?: boolean;
}

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'bg-background/40 border-border flex h-full w-full max-w-[325px] flex-col gap-4 rounded-lg border',
        className,
      )}
    >
      {/* Avatar, account details, logout button */}
      <Profile className="p-4 pl-7" />

      {/* Search */}
      <SearchBar className="w-full px-4 pb-4" />

      {/* Sidebar links */}
      <SidebarLinkGroup className="px-4" routes={FEATURE_ROUTES} />
    </div>
  );
};

export { Sidebar };
