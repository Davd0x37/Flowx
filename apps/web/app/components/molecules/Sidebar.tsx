import { Profile } from './Profile';
import { SearchBar } from './SearchBar';
import { SidebarLinkGroup } from './SidebarLinkGroup';
import { type HTMLAttributes } from 'react';
import { FEATURE_ROUTES } from '@/config/routes';
import { cn } from '@/utils/classNames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  openSidebar?: boolean;
}

const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'bg-background/40 border-border flex h-full w-full max-w-[375px] flex-col gap-4 rounded-lg border',
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
