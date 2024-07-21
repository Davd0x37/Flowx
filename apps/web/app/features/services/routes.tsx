import { Route } from 'react-router-dom';

export const routes = (
  <Route path="services" id="Services default view" lazy={() => import('./pages/_layout')}>
    {/* Default services view */}
    <Route index id="Services details" lazy={() => import('./pages/details')} />
  </Route>
);
