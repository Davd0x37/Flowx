import type { FC, SVGProps } from 'react';
import { RouteObject } from 'react-router-dom';

export type FeatureRouteProps = RouteObject & {
  meta?: {
    sidebarTitle: string;
    sidebarIcon?: FC<SVGProps<SVGSVGElement>>;
    showInSidebar: boolean;
    showInDev?: boolean;
  };

  children?: FeatureRouteProps[];
};

export type FeatureRoute = {
  name: string;
  path: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  isGroup?: boolean;
  showInDevMode?: boolean;
  disableIfAuthenticated?: boolean;
  children?: FeatureRoute[];
};
