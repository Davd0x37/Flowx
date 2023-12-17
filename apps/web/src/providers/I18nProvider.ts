import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import { SupportedLocales } from 'app/config/constants';
import locales from 'app/locales';

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
