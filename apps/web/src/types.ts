import { RouteRecordName } from 'vue-router';

export interface Notification {
  mode: NotificationMode;
  title: string;
  message: string;
}

export interface Service {
  // Service ID
  $id: string;
  // Service name
  name: string;
  // Service configuration - icon, colors etc.
  config: {
    // Icon name eg. lab la-brand
    icon: string;
    // Color used to print important labels
    color: string;
    // -------
    isEnabled: boolean;
  };
  auth: {
    hasRequestedTokens: boolean;
    // credentials: Pick<AuthParameters, 'authorizationUri' | 'clientId' | 'clientSecret' | 'tokenEndpointUri' | 'scope'> &
    //   Partial<Pick<AuthParameters, 'redirectUri'>>;
    // // Authentication tokens
    // tokens: Tokens;
  };
  // Paths where runner should look for data and obtain selected
  dataPaths: DataPath[];
  // Received data from service
  data: Data[];
}

export interface DataPath {
  path: string;
  name?: string;
  select: Data[];
}

export interface Data {
  label: string; // Title
  detail: string; // Path
  isImportant: boolean; // Is important?
  isEnabled: boolean;
  matcher?: Record<string, string | number | boolean>;
  arrayLimit?: number; // Collected array limit
}

export interface RootState {
  name: string;
  darkMode: boolean;
  lang: string;
  isAuth: boolean;
  searchBox: string;
  encryption: {
    passwordHash: string;
    salt: string;
  };
}

export interface ServiceState {
  // Record< Service name, Service content >
  list: Record<string, Service>;
}

export interface NotificationState {
  list: Notification[];
}

export interface ConvertedStore {
  store: RootState;
  serviceStore: ServiceState;
}

export interface PlusAction {
  icon: string;
  pathName: string;
}

export interface Actions {
  icon: string;
  path: {
    name: RouteRecordName | string;
  };
}

export interface SidebarPath {
  title: string;
  icon: string;
  color?: string;
  path: {
    name: RouteRecordName | string;
    params?: Record<string, unknown>;
  };
  children?: SidebarPath[];
  actions?: Actions;
}

export type NotificationMode = 'success' | 'info' | 'warning' | 'error';
