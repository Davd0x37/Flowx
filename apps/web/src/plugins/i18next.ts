import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from 'app/locales';

export const i18n = createI18n({
  locale: 'pl',
  fallbackLocale: 'en',
  legacy: false,
  messages,
});

export default (app: App<Element>) => {
  app.use(i18n);
};
