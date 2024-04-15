import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { NotFound } from 'app/components/errors/NotFound';
import { Authenticate } from 'app/pages/auth/index';
import { AuthenticateView } from 'app/pages/auth/route';
import { Home } from 'app/pages/home';
import { RootView } from 'app/pages/root';
import { ServicesView } from 'app/pages/services/route';
import { Details as UserDetails } from 'app/pages/users/details_t';
import { UserView } from 'app/pages/users/route';
import { Settings as UserSettings } from 'app/pages/users/settings_t';

export const routes = createRoutesFromElements(
  <>
    {/* Not found page route */}
    <Route path="*" element={<NotFound />}></Route>

    {/* Auth feature routes */}
    <Route path="/auth" id="Authenticate" element={<AuthenticateView />}>
      <Route index id="Authenticate default view" element={<Authenticate />} />
    </Route>

    <Route path="/" id="Dashboard layout view" element={<RootView />}>
      <Route index id="Dashboard default view" element={<Home />} />

      {/* User feature routes */}
      <Route path="user" id="User default view" element={<UserView />}>
        <Route index id="Details" element={<UserDetails />} />
        <Route path="settings" id="Settings" element={<UserSettings />} />
      </Route>

      {/* Services route */}
      <Route path="services" id="Services default view" element={<ServicesView />}></Route>
    </Route>
  </>,
);

export const router = createBrowserRouter(routes);
