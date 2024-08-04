import { Route } from 'react-router-dom';

export const routes = (
  <Route path="automations" id="Automations default view" lazy={() => import('./pages/_layout')}>
    {/* Default automations view */}
    <Route index id="Automations details" lazy={() => import('./pages/details')} />
  </Route>
);
