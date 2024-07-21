import { type FC, type SVGProps } from 'react';
import { Auth, Box, Home, User } from '@/assets/icons';

export type SidebarItem = {
  name: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  path: string;
  isGroup?: boolean;
  dev?: boolean;
  disableIfAuthenticated?: boolean;
  childrenList?: Omit<SidebarItem, 'childrenList' | 'isGroup'>[];
};

export const SidebarLinkList: SidebarItem[] = [
  {
    name: 'dashboard:page.title.homepage',
    icon: Home,
    path: '/',
  },
  {
    name: 'auth:page.title.authenticate',
    icon: Auth,
    path: '/auth/login',
    dev: true,
    disableIfAuthenticated: false,
  },
  {
    name: 'user:page.title.profile',
    icon: User,
    path: '/user',
    isGroup: true,
    childrenList: [
      {
        name: 'user:page.title.profile_details',
        path: '/user',
      },
      {
        name: 'user:page.title.settings',
        path: '/user/settings',
      },
    ],
  },
  {
    name: 'services:page.title.homepage',
    icon: Box,
    path: '/services',
  },
];
