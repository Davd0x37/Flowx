import { Route } from 'react-router-dom';

export const routes = (
  <Route path="user" id="User default view" lazy={() => import('./pages/_layout')}>
    <Route index id="User details view" lazy={() => import('./pages/details')} />
    <Route path="settings" id="User settings view" lazy={() => import('./pages/settings')}>
      {/* General settings - change user details, email etc. */}
      <Route
        index
        path="general"
        id="General settings"
        lazy={() => import('./pages/settings/general')}
      />

      {/* Security view - authentication related */}
      <Route
        path="security"
        id="Security settings"
        lazy={() => import('./pages/settings/security')}
      />

      {/* Notifications settings - webpush etc. */}
      <Route
        path="notifications"
        id="Notifications settings"
        lazy={() => import('./pages/settings/notifications')}
      />

      {/* Advanced settings - delete account */}
      <Route
        path="advanced"
        id="Advanced settings"
        lazy={() => import('./pages/settings/security')}
      />
    </Route>
  </Route>
);
