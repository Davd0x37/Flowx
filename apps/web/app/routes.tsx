import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { NotFound } from '@/components/errors/NotFound';
import { AuthRoute, ProtectedRoute } from '@/features/auth';
import { DashboardRoute } from '@/features/dashboard';
import { ServicesRoute } from '@/features/services';
import { UserRoute } from '@/features/user';
import MainLayout from '@/layouts/MainLayout';

export const routes = createRoutesFromElements(
  <>
    {/* Not found page route */}
    <Route path="*" element={<NotFound />}></Route>

    {/* Auth feature routes */}
    {AuthRoute}

    <Route
      path="/"
      id="Main layout"
      element={
        <ProtectedRoute redirect="/auth/login">
          <MainLayout />
        </ProtectedRoute>
      }
    >
      {/* Main page view - index path */}
      {DashboardRoute}

      {/* User feature routes */}
      {UserRoute}

      {/* Services route */}
      {ServicesRoute}
    </Route>
  </>,
);

export const router = createBrowserRouter(routes);
