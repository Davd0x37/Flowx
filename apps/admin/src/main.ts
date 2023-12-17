import { createApp } from 'vue';

// Styles
import 'app/assets/base.css';
// Plugins
import plugins from 'app/plugins';

import App from './App.vue';
import setupFeatures from './features';
import routes from './routes';

const app = createApp(App);

plugins.forEach((plugin) => {
  plugin(app);
});

setupFeatures();

app.use(routes).mount('#app');
