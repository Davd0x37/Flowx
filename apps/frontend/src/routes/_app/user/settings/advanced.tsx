import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

function Advanced() {
  const { t } = useTranslation()

  return <div>{t('user.page.title.advanced')}</div>
}

export const Route = createFileRoute('/_app/user/settings/advanced')({
  component: Advanced,
})
