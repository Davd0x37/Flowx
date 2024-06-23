import ProtectedRoute from './components/auth/ProtectedRoute';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { NotFound } from '@/components/errors/NotFound';
import AuthenticateLayout from '@/layouts/AuthenticateLayout';
import MainLayout from '@/layouts/MainLayout';
import { Authenticate } from '@/pages/auth/route';
import { Home } from '@/pages/home';

export const routes = createRoutesFromElements(
  <>
    {/* Not found page route */}
    <Route path="*" element={<NotFound />}></Route>

    {/* Auth feature routes */}
    <Route id="Authenticate layout" element={<AuthenticateLayout />}>
      <Route index path="/auth" id="Authenticate" element={<Authenticate />} />
    </Route>

    <Route
      path="/"
      id="Main layout"
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
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
