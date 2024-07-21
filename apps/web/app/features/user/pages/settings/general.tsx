import { useTranslation } from 'react-i18next';

const General = () => {
  const { t } = useTranslation('user');

  return <div>{t('page.title.general')}</div>;
};

export { General as Component };
