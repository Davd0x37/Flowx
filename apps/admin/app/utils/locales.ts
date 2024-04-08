import { SupportedLocales } from 'app/config/constants';
import { i18n } from 'app/plugins/i18next';

type LocaleType = (typeof SupportedLocales)[number];

export function setLocaleLang(locale: LocaleType) {
  if (!SupportedLocales.includes(locale)) return;

  i18n.global.locale.value = locale;

  document.querySelector('html')?.setAttribute('lang', locale);
}

export const installLocale = (locale: LocaleType, messages: any) => {
  i18n.global.mergeLocaleMessage(locale, messages);
};

export const installLocales = (featureName: string, locales: Record<LocaleType, unknown>) => {
  Object.entries(locales).forEach(([locale, messages]) => {
    installLocale(locale as LocaleType, {
      [featureName]: messages,
    });
  });
};
