import { App } from 'vue';

import { VueQueryPlugin } from '@tanstack/vue-query';

export default (app: App<Element>) => {
  app.use(VueQueryPlugin);
};
