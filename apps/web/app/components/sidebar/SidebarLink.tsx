import { HTMLAttributes, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { FeatureRoute } from '@/types/route';
import { cn } from '@/utils/classNames';
import { buttonVariants } from '@ui/button';

type SidebarLinkProps = FeatureRoute & {
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
        'hover:bg-primary/70 flex justify-start space-x-2 rounded-md px-4 py-5 transition-colors',
        className,
      )}
    >
      <SidebarLinkContent name={name} icon={icon} iconSize={iconSize} hideName={hideName} />
    </Link>
  );
});

export { SidebarLink, SidebarLinkContent };
