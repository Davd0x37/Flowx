import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { NotFound } from '@/components/errors/NotFound';
import { Authenticate } from '@/pages/auth/index';
import { AuthenticateView } from '@/pages/auth/route';
import { Home } from '@/pages/home';
import { RootView } from '@/pages/root';

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
      <Route path="user" id="User default view" lazy={() => import('@/pages/user/route')}>
        <Route index id="Details" lazy={() => import('@/pages/user/details')} />
        <Route path="settings" id="Settings" lazy={() => import('@/pages/user/settings')} />
      </Route>

      {/* Services route */}
      <Route
        path="services"
        id="Services default view"
        lazy={() => import('@/pages/services/route')}
      ></Route>
    </Route>
  </>,
);

export const router = createBrowserRouter(routes);
