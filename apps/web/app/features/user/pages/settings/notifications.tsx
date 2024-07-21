import { useTranslation } from 'react-i18next';

const Notifications = () => {
  const { t } = useTranslation('user');

  return <div>{t('page.title.notifications')}</div>;
};

export { Notifications as Component };
