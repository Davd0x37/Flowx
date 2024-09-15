import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const Security = () => {
  const { t } = useTranslation('user')

  return <div>{t('page.title.security')}</div>
}

export const Route = createFileRoute('/_app/user/settings/security')({
  component: Security,
})
