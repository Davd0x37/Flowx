import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { NotFound } from '~/components/errors';
import { MainLayout } from '~/components/layouts';
import { AuthRoute, ProtectedRoute } from '~/features/auth';
import { AutomationsRoute } from '~/features/automations';
import { DashboardRoute } from '~/features/dashboard';
import { IntegrationsRoute } from '~/features/integrations';
import { ServicesRoute } from '~/features/services';
import { UserRoute } from '~/features/user';

export const routes = createRoutesFromElements(
  <>
    {/* Not found page */}
    <Route path="*" element={<NotFound />} />

    {/* Auth feature routes */}
    {AuthRoute}

    {/* Protected routes - dashboard, user etc. */}
    <Route
      path="/"
      id="Main layout"
      element={
        <ProtectedRoute redirect="/auth/login">
          <MainLayout />
        </ProtectedRoute>
      }
    >
      {/* Main page view */}
      {DashboardRoute}

      {/* User feature routes */}
      {UserRoute}

      {/* Services route */}
      {ServicesRoute}

      {/* Automations route */}
      {AutomationsRoute}

      {/* Integrations route */}
      {IntegrationsRoute}
    </Route>
  </>,
);

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes);
