/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AppImport } from './routes/_app'
import { Route as AppIndexImport } from './routes/_app/index'
import { Route as AppUserIndexImport } from './routes/_app/user/index'
import { Route as AppServicesIndexImport } from './routes/_app/services/index'
import { Route as AppIntegrationsIndexImport } from './routes/_app/integrations/index'
import { Route as AppAutomationsIndexImport } from './routes/_app/automations/index'
import { Route as AuthAuthSignupImport } from './routes/_auth/auth/signup'
import { Route as AuthAuthLoginImport } from './routes/_auth/auth/login'
import { Route as AppUserSettingsImport } from './routes/_app/user/settings'
import { Route as AppUserSettingsIndexImport } from './routes/_app/user/settings/index'
import { Route as AppUserSettingsSecurityImport } from './routes/_app/user/settings/security'
import { Route as AppUserSettingsNotificationsImport } from './routes/_app/user/settings/notifications'
import { Route as AppUserSettingsAdvancedImport } from './routes/_app/user/settings/advanced'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const AppUserIndexRoute = AppUserIndexImport.update({
  path: '/user/',
  getParentRoute: () => AppRoute,
} as any)

const AppServicesIndexRoute = AppServicesIndexImport.update({
  path: '/services/',
  getParentRoute: () => AppRoute,
} as any)

const AppIntegrationsIndexRoute = AppIntegrationsIndexImport.update({
  path: '/integrations/',
  getParentRoute: () => AppRoute,
} as any)

const AppAutomationsIndexRoute = AppAutomationsIndexImport.update({
  path: '/automations/',
  getParentRoute: () => AppRoute,
} as any)

const AuthAuthSignupRoute = AuthAuthSignupImport.update({
  path: '/auth/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAuthLoginRoute = AuthAuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => AuthRoute,
} as any)

const AppUserSettingsRoute = AppUserSettingsImport.update({
  path: '/user/settings',
  getParentRoute: () => AppRoute,
} as any)

const AppUserSettingsIndexRoute = AppUserSettingsIndexImport.update({
  path: '/',
  getParentRoute: () => AppUserSettingsRoute,
} as any)

const AppUserSettingsSecurityRoute = AppUserSettingsSecurityImport.update({
  path: '/security',
  getParentRoute: () => AppUserSettingsRoute,
} as any)

const AppUserSettingsNotificationsRoute =
  AppUserSettingsNotificationsImport.update({
    path: '/notifications',
    getParentRoute: () => AppUserSettingsRoute,
  } as any)

const AppUserSettingsAdvancedRoute = AppUserSettingsAdvancedImport.update({
  path: '/advanced',
  getParentRoute: () => AppUserSettingsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/user/settings': {
      id: '/_app/user/settings'
      path: '/user/settings'
      fullPath: '/user/settings'
      preLoaderRoute: typeof AppUserSettingsImport
      parentRoute: typeof AppImport
    }
    '/_auth/auth/login': {
      id: '/_auth/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/auth/signup': {
      id: '/_auth/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthAuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/_app/automations/': {
      id: '/_app/automations/'
      path: '/automations'
      fullPath: '/automations'
      preLoaderRoute: typeof AppAutomationsIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/integrations/': {
      id: '/_app/integrations/'
      path: '/integrations'
      fullPath: '/integrations'
      preLoaderRoute: typeof AppIntegrationsIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/services/': {
      id: '/_app/services/'
      path: '/services'
      fullPath: '/services'
      preLoaderRoute: typeof AppServicesIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/user/': {
      id: '/_app/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof AppUserIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/user/settings/advanced': {
      id: '/_app/user/settings/advanced'
      path: '/advanced'
      fullPath: '/user/settings/advanced'
      preLoaderRoute: typeof AppUserSettingsAdvancedImport
      parentRoute: typeof AppUserSettingsImport
    }
    '/_app/user/settings/notifications': {
      id: '/_app/user/settings/notifications'
      path: '/notifications'
      fullPath: '/user/settings/notifications'
      preLoaderRoute: typeof AppUserSettingsNotificationsImport
      parentRoute: typeof AppUserSettingsImport
    }
    '/_app/user/settings/security': {
      id: '/_app/user/settings/security'
      path: '/security'
      fullPath: '/user/settings/security'
      preLoaderRoute: typeof AppUserSettingsSecurityImport
      parentRoute: typeof AppUserSettingsImport
    }
    '/_app/user/settings/': {
      id: '/_app/user/settings/'
      path: '/'
      fullPath: '/user/settings/'
      preLoaderRoute: typeof AppUserSettingsIndexImport
      parentRoute: typeof AppUserSettingsImport
    }
  }
}

// Create and export the route tree

interface AppUserSettingsRouteChildren {
  AppUserSettingsAdvancedRoute: typeof AppUserSettingsAdvancedRoute
  AppUserSettingsNotificationsRoute: typeof AppUserSettingsNotificationsRoute
  AppUserSettingsSecurityRoute: typeof AppUserSettingsSecurityRoute
  AppUserSettingsIndexRoute: typeof AppUserSettingsIndexRoute
}

const AppUserSettingsRouteChildren: AppUserSettingsRouteChildren = {
  AppUserSettingsAdvancedRoute: AppUserSettingsAdvancedRoute,
  AppUserSettingsNotificationsRoute: AppUserSettingsNotificationsRoute,
  AppUserSettingsSecurityRoute: AppUserSettingsSecurityRoute,
  AppUserSettingsIndexRoute: AppUserSettingsIndexRoute,
}

const AppUserSettingsRouteWithChildren = AppUserSettingsRoute._addFileChildren(
  AppUserSettingsRouteChildren,
)

interface AppRouteChildren {
  AppIndexRoute: typeof AppIndexRoute
  AppUserSettingsRoute: typeof AppUserSettingsRouteWithChildren
  AppAutomationsIndexRoute: typeof AppAutomationsIndexRoute
  AppIntegrationsIndexRoute: typeof AppIntegrationsIndexRoute
  AppServicesIndexRoute: typeof AppServicesIndexRoute
  AppUserIndexRoute: typeof AppUserIndexRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppIndexRoute: AppIndexRoute,
  AppUserSettingsRoute: AppUserSettingsRouteWithChildren,
  AppAutomationsIndexRoute: AppAutomationsIndexRoute,
  AppIntegrationsIndexRoute: AppIntegrationsIndexRoute,
  AppServicesIndexRoute: AppServicesIndexRoute,
  AppUserIndexRoute: AppUserIndexRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthAuthLoginRoute: typeof AuthAuthLoginRoute
  AuthAuthSignupRoute: typeof AuthAuthSignupRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthLoginRoute: AuthAuthLoginRoute,
  AuthAuthSignupRoute: AuthAuthSignupRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren
  '/': typeof AppIndexRoute
  '/user/settings': typeof AppUserSettingsRouteWithChildren
  '/auth/login': typeof AuthAuthLoginRoute
  '/auth/signup': typeof AuthAuthSignupRoute
  '/automations': typeof AppAutomationsIndexRoute
  '/integrations': typeof AppIntegrationsIndexRoute
  '/services': typeof AppServicesIndexRoute
  '/user': typeof AppUserIndexRoute
  '/user/settings/advanced': typeof AppUserSettingsAdvancedRoute
  '/user/settings/notifications': typeof AppUserSettingsNotificationsRoute
  '/user/settings/security': typeof AppUserSettingsSecurityRoute
  '/user/settings/': typeof AppUserSettingsIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/': typeof AppIndexRoute
  '/auth/login': typeof AuthAuthLoginRoute
  '/auth/signup': typeof AuthAuthSignupRoute
  '/automations': typeof AppAutomationsIndexRoute
  '/integrations': typeof AppIntegrationsIndexRoute
  '/services': typeof AppServicesIndexRoute
  '/user': typeof AppUserIndexRoute
  '/user/settings/advanced': typeof AppUserSettingsAdvancedRoute
  '/user/settings/notifications': typeof AppUserSettingsNotificationsRoute
  '/user/settings/security': typeof AppUserSettingsSecurityRoute
  '/user/settings': typeof AppUserSettingsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_app/': typeof AppIndexRoute
  '/_app/user/settings': typeof AppUserSettingsRouteWithChildren
  '/_auth/auth/login': typeof AuthAuthLoginRoute
  '/_auth/auth/signup': typeof AuthAuthSignupRoute
  '/_app/automations/': typeof AppAutomationsIndexRoute
  '/_app/integrations/': typeof AppIntegrationsIndexRoute
  '/_app/services/': typeof AppServicesIndexRoute
  '/_app/user/': typeof AppUserIndexRoute
  '/_app/user/settings/advanced': typeof AppUserSettingsAdvancedRoute
  '/_app/user/settings/notifications': typeof AppUserSettingsNotificationsRoute
  '/_app/user/settings/security': typeof AppUserSettingsSecurityRoute
  '/_app/user/settings/': typeof AppUserSettingsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/'
    | '/user/settings'
    | '/auth/login'
    | '/auth/signup'
    | '/automations'
    | '/integrations'
    | '/services'
    | '/user'
    | '/user/settings/advanced'
    | '/user/settings/notifications'
    | '/user/settings/security'
    | '/user/settings/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/'
    | '/auth/login'
    | '/auth/signup'
    | '/automations'
    | '/integrations'
    | '/services'
    | '/user'
    | '/user/settings/advanced'
    | '/user/settings/notifications'
    | '/user/settings/security'
    | '/user/settings'
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_app/'
    | '/_app/user/settings'
    | '/_auth/auth/login'
    | '/_auth/auth/signup'
    | '/_app/automations/'
    | '/_app/integrations/'
    | '/_app/services/'
    | '/_app/user/'
    | '/_app/user/settings/advanced'
    | '/_app/user/settings/notifications'
    | '/_app/user/settings/security'
    | '/_app/user/settings/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/",
        "/_app/user/settings",
        "/_app/automations/",
        "/_app/integrations/",
        "/_app/services/",
        "/_app/user/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/auth/login",
        "/_auth/auth/signup"
      ]
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/_app/user/settings": {
      "filePath": "_app/user/settings.tsx",
      "parent": "/_app",
      "children": [
        "/_app/user/settings/advanced",
        "/_app/user/settings/notifications",
        "/_app/user/settings/security",
        "/_app/user/settings/"
      ]
    },
    "/_auth/auth/login": {
      "filePath": "_auth/auth/login.tsx",
      "parent": "/_auth"
    },
    "/_auth/auth/signup": {
      "filePath": "_auth/auth/signup.tsx",
      "parent": "/_auth"
    },
    "/_app/automations/": {
      "filePath": "_app/automations/index.tsx",
      "parent": "/_app"
    },
    "/_app/integrations/": {
      "filePath": "_app/integrations/index.tsx",
      "parent": "/_app"
    },
    "/_app/services/": {
      "filePath": "_app/services/index.tsx",
      "parent": "/_app"
    },
    "/_app/user/": {
      "filePath": "_app/user/index.tsx",
      "parent": "/_app"
    },
    "/_app/user/settings/advanced": {
      "filePath": "_app/user/settings/advanced.tsx",
      "parent": "/_app/user/settings"
    },
    "/_app/user/settings/notifications": {
      "filePath": "_app/user/settings/notifications.tsx",
      "parent": "/_app/user/settings"
    },
    "/_app/user/settings/security": {
      "filePath": "_app/user/settings/security.tsx",
      "parent": "/_app/user/settings"
    },
    "/_app/user/settings/": {
      "filePath": "_app/user/settings/index.tsx",
      "parent": "/_app/user/settings"
    }
  }
}
ROUTE_MANIFEST_END */
