import { HTMLAttributes, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { FeatureRouteProps } from '@/types/route';
import { cn } from '@/utils/classNames';
import { buttonVariants } from '@ui/button';

type SidebarLinkProps = {
  name: string;
  path: string;
  icon: NonNullable<FeatureRouteProps['meta']>['sidebarIcon'];
  iconSize?: string;
  hideName?: boolean;
};
type SidebarLinkContentProps = Omit<SidebarLinkProps, 'path'>;

const SidebarLinkContent = ({
  name,
  icon,
  iconSize = '1.25rem',
  hideName = false,
}: SidebarLinkContentProps) => {
  return (
    <>
      {icon && icon({ fontSize: iconSize })}
      {!hideName && <p className="font-semibold">{name}</p>}
    </>
  );
};

const SidebarLink = forwardRef<
  HTMLAnchorElement,
  SidebarLinkProps & Pick<HTMLAttributes<HTMLAnchorElement>, 'className'>
>(({ name, path, icon, iconSize = '1.25rem', hideName = false, className }, ref) => {
  return (
    <Link
      to={path}
      ref={ref}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'hover:bg-primary flex justify-start space-x-2 rounded-md p-4 transition-colors',
        className,
      )}
    >
      <SidebarLinkContent name={name} icon={icon} iconSize={iconSize} hideName={hideName} />
    </Link>
  );
});

export { SidebarLink, SidebarLinkContent };
