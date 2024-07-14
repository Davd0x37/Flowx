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
    name: 'Home',
    icon: Home,
    path: '/',
  },
  {
    name: 'Authenticate',
    icon: Auth,
    path: '/auth/login',
    dev: true,
    disableIfAuthenticated: false,
  },
  {
    name: 'Profile',
    icon: User,
    path: '/user',
    isGroup: true,
    childrenList: [
      {
        name: 'Profile Details',
        path: '/user',
      },
      {
        name: 'Settings',
        path: '/user/settings',
      },
    ],
  },
  {
    name: 'Services',
    icon: Box,
    path: '/services',
  },
];
