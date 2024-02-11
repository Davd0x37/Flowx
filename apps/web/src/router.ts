import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import {
  Auth as AuthIcon,
  Home as HomeIcon,
  UserBox as ProfileIcon,
  Settings as SettingsIcon,
  User as UserIcon,
} from 'app/assets/icons';
import Auth from 'app/pages/Authenticate/Auth.vue';
import Home from 'app/pages/Dashboard/Home.vue';
import NotFound from 'app/pages/Error/NotFound.vue';
import UserDetails from 'app/pages/User/Details.vue';
import UserSettings from 'app/pages/User/Settings.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'views.home',
      icon: HomeIcon,
      layout: 'Main',
    },
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: 'views.user',
      icon: ProfileIcon,
      layout: 'Main',
    },
    children: [
      {
        path: '',
        name: 'user-details',
        component: UserDetails,
        meta: {
          title: 'views.user-details',
          icon: UserIcon,
        },
      },
      {
        path: 'settings',
        name: 'user-settings',
        component: UserSettings,
        meta: {
          title: 'views.user-settings',
          icon: SettingsIcon,
        },
      },
    ],
  },
  {
    path: '/auth',
    name: 'authenticate',
    component: Auth,
    meta: {
      title: 'views.authenticate',
      icon: AuthIcon,
      layout: 'Authenticate',
      // displayInNav: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      layout: 'Error',
      displayInNav: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
