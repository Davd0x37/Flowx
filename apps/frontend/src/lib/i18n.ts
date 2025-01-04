import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { SUPPORTED_LOCALES } from '~/config/constants'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },

    supportedLngs: SUPPORTED_LOCALES,
  })
  .catch(() => {
    console.warn('i18n failed to initialize')
  })

export default i18n
