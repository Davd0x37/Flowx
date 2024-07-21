import { useTranslation } from 'react-i18next';

const Security = () => {
  const { t } = useTranslation('user');

  return <div>{t('page.title.security')}</div>;
};

export { Security as Component };
