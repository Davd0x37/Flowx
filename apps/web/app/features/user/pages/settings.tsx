import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '@/utils/classNames';
import { Separator } from '@ui/separator';

type NavigationLinkProps = PropsWithChildren<{
  to: string;
}>;

const NavigationLink = ({ children, to }: NavigationLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn('border-b border-b-transparent py-4', isActive && 'border-b-primary')
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

const Settings = () => {
  const { t } = useTranslation('user');

  return (
    <div className="flex h-full flex-col gap-4 md:gap-8">
      <div>
        <h1 className="text-3xl font-semibold">{t('page.title.settings')}</h1>
      </div>

      <Separator />

      <div className="space-y-8">
        <nav className="flex w-full flex-row gap-8 border-b border-b-gray-700 text-sm font-semibold">
          {/* General link */}
          <NavigationLink to="/user/settings/general">{t('page.title.general')}</NavigationLink>

          {/* Security link */}
          <NavigationLink to="/user/settings/security">{t('page.title.security')}</NavigationLink>

          {/* Notifications link */}
          <NavigationLink to="/user/settings/notifications">
            {t('page.title.notifications')}
          </NavigationLink>

          {/* Advanced link */}
          <NavigationLink to="/user/settings/advanced">{t('page.title.advanced')}</NavigationLink>
        </nav>

        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Settings as Component };
