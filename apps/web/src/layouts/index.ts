import AuthenticateLayout from './AuthenticateLayout.vue';
import ErrorLayout from './ErrorLayout.vue';
import MainLayout from './MainLayout.vue';

export type Layouts = keyof typeof LAYOUTS;
export const LAYOUTS = {
  Main: MainLayout,
  Authenticate: AuthenticateLayout,
  Error: ErrorLayout,
};
