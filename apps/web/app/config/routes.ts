import { Auth, Box, Home, Integration, Schema, Settings, User, UserDetails } from '@/assets/icons';
import { FeatureRoute } from '@/types/route';

export const FEATURE_ROUTES: FeatureRoute[] = [
  {
    name: 'dashboard:page.title.homepage',
    icon: Home,
    path: '/',
  },
  {
    name: 'auth:page.title.authenticate',
    icon: Auth,
    path: '/auth/login',
    showInDevMode: true,
    disableIfAuthenticated: false,
  },
  {
    name: 'user:page.title.profile',
    icon: User,
    path: '/user',
    isGroup: true,
    children: [
      {
        name: 'user:page.title.profile_details',
        path: '/user',
        icon: UserDetails,
      },
      {
        name: 'user:page.title.settings',
        path: '/user/settings',
        icon: Settings,
        // isGroup: true,
        // children: [
        //   {
        //     name: 'user:page.title.general',
        //     path: '/user/settings/general',
        //   },
        //   {
        //     name: 'user:page.title.security',
        //     path: '/user/settings/security',
        //   },
        //   {
        //     name: 'user:page.title.notifications',
        //     path: '/user/settings/notifications',
        //   },
        //   {
        //     name: 'user:page.title.advanced',
        //     path: '/user/settings/advanced',
        //   },
        // ],
      },
    ],
  },
  {
    name: 'services:page.title.homepage',
    icon: Box,
    path: '/services',
  },
  {
    name: 'automations:page.title.homepage',
    icon: Schema,
    path: '/automations',
  },
  {
    name: 'integrations:page.title.homepage',
    icon: Integration,
    path: '/integrations',
  },
];
