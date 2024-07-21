import AuthenticateLayout from './layouts/AuthenticateLayout';
import { LoginView } from './pages/login';
import { Route } from 'react-router-dom';

export const routes = (
  <Route path="/auth" id="Authenticate" element={<AuthenticateLayout />}>
    {/* Default login form view */}
    <Route index path="login" id="Login view" element={<LoginView />} />

    {/* Signup form */}
    <Route path="signup" id="Signup view" lazy={() => import('./pages/signup')} />
  </Route>
);
