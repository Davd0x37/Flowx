import { AuthLocales } from '@/features/auth';
import { DashboardLocales } from '@/features/dashboard';
import { ServicesLocales } from '@/features/services';
import { UserLocales } from '@/features/user';

export default {
  en: {
    ...UserLocales.en,
    ...AuthLocales.en,
    ...ServicesLocales.en,
    ...DashboardLocales.en,
  },
  pl: {
    ...UserLocales.pl,
    ...AuthLocales.pl,
    ...ServicesLocales.pl,
    ...DashboardLocales.pl,
  },
};
