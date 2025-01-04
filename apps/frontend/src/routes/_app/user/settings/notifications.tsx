import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

function Notifications() {
  const { t } = useTranslation()

  return <div>{t('user.page.title.notifications')}</div>
}

export const Route = createFileRoute('/_app/user/settings/notifications')({
  component: Notifications,
})
