import type { PropsWithChildren } from 'react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Separator } from '~ui/separator'
import { useTranslation } from 'react-i18next'

type NavigationLinkProps = PropsWithChildren<{
  to: string
}>

function NavigationLink({ children, to }: NavigationLinkProps) {
  return (
    <Link
      activeProps={{ className: 'border-b-primary' }}
      className="border-b border-b-transparent py-4"
      to={to}
    >
      {children}
    </Link>
  )
}

function Settings() {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col gap-4 md:gap-8">
      <div>
        <h1 className="text-3xl font-semibold">
          {t('user.page.title.settings')}
        </h1>
      </div>

      <Separator />

      <div className="space-y-8">
        <nav className="flex w-full flex-row gap-8 border-b border-b-gray-700 text-sm font-semibold">
          {/* General link */}
          <NavigationLink to="/user/settings/">
            {t('user.page.title.general')}
          </NavigationLink>

          {/* Security link */}
          <NavigationLink to="/user/settings/security">
            {t('user.page.title.security')}
          </NavigationLink>

          {/* Notifications link */}
          <NavigationLink to="/user/settings/notifications">
            {t('user.page.title.notifications')}
          </NavigationLink>

          {/* Advanced link */}
          <NavigationLink to="/user/settings/advanced">
            {t('user.page.title.advanced')}
          </NavigationLink>
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
