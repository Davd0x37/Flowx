import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

function General() {
  const { t } = useTranslation()

  return <div>{t('user.page.title.general')}</div>
}

export const Route = createFileRoute('/_app/user/settings/')({
  component: General,
})
