import { AuthLocales } from '~/features/auth';
import { AutomationsLocales } from '~/features/automations';
import { DashboardLocales } from '~/features/dashboard';
import { IntegrationsLocales } from '~/features/integrations';
import { ServicesLocales } from '~/features/services';
import { UserLocales } from '~/features/user';

export default {
  en: {
    ...UserLocales.en,
    ...AuthLocales.en,
    ...ServicesLocales.en,
    ...DashboardLocales.en,
    ...AutomationsLocales.en,
    ...IntegrationsLocales.en,
  },
  pl: {
    ...UserLocales.pl,
    ...AuthLocales.pl,
    ...ServicesLocales.pl,
    ...DashboardLocales.pl,
    ...AutomationsLocales.pl,
    ...IntegrationsLocales.pl,
  },
};
