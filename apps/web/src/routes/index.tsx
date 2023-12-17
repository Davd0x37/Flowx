import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import NotFound from 'app/components/pages/NotFound';
import { Authenticate } from 'app/features/auth';
import { DashboardDefaultView, Home } from 'app/features/dashboard';
import { ServicesDefaultView } from 'app/features/services';
import { UserDefaultView, UserDetails, UserSettings } from 'app/features/user';

export const routes = createRoutesFromElements(
  <>
    {/* Not found page route */}
    <Route path="*" element={<NotFound />}></Route>

    {/* Auth feature routes */}
    <Route path="/auth" id="Authenticate" element={<Authenticate />}></Route>

    <Route path="/" id="Dashboard layout view" element={<DashboardDefaultView />}>
      <Route index id="Dashboard default view" element={<Home />} />

      {/* User feature routes */}
      <Route path="user" id="User default view" element={<UserDefaultView />}>
        <Route index id="Details" element={<UserDetails />} />
        <Route path="settings" id="Settings" element={<UserSettings />} />
      </Route>

      {/* Services route */}
      <Route path="services" id="Services default view" element={<ServicesDefaultView />}></Route>
    </Route>
  </>,
);

export const router = createBrowserRouter(routes);
