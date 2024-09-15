import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Separator } from '~/components/ui/separator'

import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

type NavigationLinkProps = PropsWithChildren<{
  to: string
}>

const NavigationLink = ({ children, to }: NavigationLinkProps) => {
  return (
    <Link
      className="border-b border-b-transparent py-4"
      activeProps={{ className: 'border-b-primary' }}
      to={to}
    >
      {children}
    </Link>
  )
}

const Settings = () => {
  const { t } = useTranslation('user')

  return (
    <div className="flex h-full flex-col gap-4 md:gap-8">
      <div>
        <h1 className="text-3xl font-semibold">{t('page.title.settings')}</h1>
      </div>

      <Separator />

      <div className="space-y-8">
        <nav className="flex w-full flex-row gap-8 border-b border-b-gray-700 text-sm font-semibold">
          {/* General link */}
          <NavigationLink to="/user/settings/">{t('page.title.general')}</NavigationLink>

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
  )
}

export const Route = createFileRoute('/_app/user/settings')({
  component: Settings,
})
