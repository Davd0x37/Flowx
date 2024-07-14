import ProtectedRoute from './features/auth/components/ProtectedRoute';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { NotFound } from '@/components/errors/NotFound';
import AuthenticateLayout from '@/layouts/AuthenticateLayout';
import MainLayout from '@/layouts/MainLayout';
import { LoginView } from '@/pages/auth/login';
import { Home } from '@/pages/home';

export const routes = createRoutesFromElements(
  <>
    {/* Not found page route */}
    <Route path="*" element={<NotFound />}></Route>

    {/* Auth feature routes */}
    <Route path="/auth" id="Authenticate" element={<AuthenticateLayout />}>
      <Route index path="login" id="Login" element={<LoginView />} />
      <Route path="signup" id="Signup" lazy={() => import('@/pages/auth/signup')} />
    </Route>

    <Route
      path="/"
      id="Main layout"
      element={
        <ProtectedRoute redirect="/auth/login">
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route index id="Dashboard default view" element={<Home />} />

      {/* User feature routes */}
      <Route path="user" id="User default view" lazy={() => import('@/pages/user/_layout')}>
        <Route index id="Details" lazy={() => import('@/pages/user/details')} />
        <Route path="settings" id="Settings" lazy={() => import('@/pages/user/settings')} />
      </Route>

      {/* Services route */}
      <Route
        path="services"
        id="Services default view"
        lazy={() => import('@/pages/services/_layout')}
      ></Route>
    </Route>
  </>,
);

export const router = createBrowserRouter(routes);
