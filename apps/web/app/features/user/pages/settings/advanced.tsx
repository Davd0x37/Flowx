import { useTranslation } from 'react-i18next';

const Advanced = () => {
  const { t } = useTranslation('user');

  return <div>{t('page.title.advanced')}</div>;
};

export { Advanced as Component };
