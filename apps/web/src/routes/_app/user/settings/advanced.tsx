import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const Advanced = () => {
  const { t } = useTranslation('user')

  return <div>{t('page.title.advanced')}</div>
}

export const Route = createFileRoute('/_app/user/settings/advanced')({
  component: Advanced,
})
