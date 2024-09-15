import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const Notifications = () => {
  const { t } = useTranslation('user')

  return <div>{t('page.title.notifications')}</div>
}

export const Route = createFileRoute('/_app/user/settings/notifications')({
  component: Notifications,
})
