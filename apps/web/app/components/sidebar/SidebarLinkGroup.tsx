import { SidebarGroup, SidebarLink, SidebarLinkContent } from './index';
import { HTMLAttributes, forwardRef, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { isDev } from '@/config/constants';
import { FeatureRoute } from '@/types/route';
import { cn } from '@/utils/classNames';

type SidebarProps = HTMLAttributes<HTMLDivElement> & {
  routes: FeatureRoute[];
};

const GetRouteComponent = ({
  name,
  icon,
  path,
  isGroup,
  children,
  showInDevMode,
  disableIfAuthenticated,
}: FeatureRoute) => {
  const { t } = useTranslation();

  if (isGroup && children) {
    return (
      <SidebarGroup key={useId()} GroupTrigger={<SidebarLinkContent name={t(name)} icon={icon} />}>
        {children.map((nestedRoute) => GetRouteComponent(nestedRoute))}
      </SidebarGroup>
    );
  }

  // If the route is only for development mode, and we are not in development mode, return null
  if (showInDevMode && !isDev) return null;

  // Return null if the route is only for authenticated users and the user is authenticated
  if (disableIfAuthenticated) return null;

  return <SidebarLink key={useId()} name={t(name)} path={path} icon={icon} />;
};

const SidebarLinkGroup = forwardRef<HTMLDivElement, SidebarProps>(({ routes, className }, ref) => {
  return (
    <div ref={ref} className={cn('flex flex-col', className)}>
      {routes.map((route) => GetRouteComponent(route))}
    </div>
  );
});

export { SidebarLinkGroup };
