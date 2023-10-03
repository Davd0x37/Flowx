import { Auth, Profile, Settings } from 'app/assets/icons';
import router from 'app/routes';
import { Authenticate, UserDefault, UserDetails, UserSettings } from './views';

router.addRoute({
  path: '/user',
  name: 'user',
  component: UserDefault,
  meta: {
    title: 'user.title',
    icon: Profile,
  },
  children: [
    {
      path: 'authenticate',
      name: 'user-authenticate',
      component: Authenticate,
      meta: {
        title: 'user.authenticate.title',
        icon: Auth,
      },
    },
    {
      path: 'user-details',
      name: 'user-details',
      component: UserDetails,
      meta: {
        title: 'user.title',
        icon: Profile,
      },
    },
    {
      path: 'settings',
      name: 'user-settings',
      component: UserSettings,
      meta: {
        title: 'user.settings.title',
        icon: Settings,
      },
    },
  ],
});

export default {};
