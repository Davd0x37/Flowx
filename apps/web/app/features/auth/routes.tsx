import AuthenticateLayout from './layouts/AuthenticateLayout';
import { LoginView } from './pages/login';
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

export const routes = (
  <Route path="auth" id="Authenticate default view" element={<AuthenticateLayout />}>
    {/* Redirect to login view */}
    <Route index id="Redirect to login" element={<Navigate to="login" />} />

    {/* Default login form view */}
    <Route path="login" id="Login view" element={<LoginView />} />

    {/* Signup form */}
    <Route path="signup" id="Signup view" lazy={() => import('./pages/signup')} />
  </Route>
);
