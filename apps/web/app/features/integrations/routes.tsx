import { Route } from 'react-router-dom';

export const routes = (
  <Route path="integrations" id="Integrations default view" lazy={() => import('./pages/_layout')}>
    {/* Default integrations view */}
    <Route index id="Integrations details" lazy={() => import('./pages/details')} />
  </Route>
);
