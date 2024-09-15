import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const General = () => {
  const { t } = useTranslation('user')

  return <div>{t('page.title.general')}</div>
}

export const Route = createFileRoute('/_app/user/settings/')({
  component: General,
})
