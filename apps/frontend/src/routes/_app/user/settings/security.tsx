import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

function Security() {
  const { t } = useTranslation()

  return <div>{t('user.page.title.security')}</div>
}

export const Route = createFileRoute('/_app/user/settings/security')({
  component: Security,
})
