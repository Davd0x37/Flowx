import { I18nextProvider, initReactI18next } from 'react-i18next';
import { SupportedLocales } from '@/config/constants';
import locales from '@/locales';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  resources: locales,
  lng: 'pl',
  fallbackLng: 'en',
  supportedLngs: SupportedLocales,

  interpolation: {
    escapeValue: false,
  },
});

export { i18n, I18nextProvider };
