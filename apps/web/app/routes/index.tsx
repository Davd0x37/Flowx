import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AuthView from 'app/pages/Authenticate/AuthView';
import Home from 'app/pages/Dashboard/Home';
import NotFound from 'app/pages/Error/NotFound';
import AuthenticateView from 'app/pages/LayoutView/Auth';
import DashboardDefaultView from 'app/pages/LayoutView/Default';
import ServicesDefaultView from 'app/pages/Services/ServicesView';
import UserDefaultView from 'app/pages/User/DefaultView';
import UserDetails from 'app/pages/User/Details';
import UserSettings from 'app/pages/User/Settings';

export const routes = createRoutesFromElements(
  <>
    {/* Not found page route */}
    <Route path="*" element={<NotFound />}></Route>

    {/* Auth feature routes */}
    <Route path="/auth" id="Authenticate" element={<AuthenticateView />}>
      <Route index id="Authenticate default view" element={<AuthView />} />
    </Route>

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
