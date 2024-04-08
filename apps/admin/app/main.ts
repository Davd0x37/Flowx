import { createApp } from 'vue';
import App from 'app/App.vue';
// Plugins
import plugins from 'app/plugins';
// Routes
import router from 'app/router';

const app = createApp(App);

plugins.forEach((plugin) => {
  plugin(app);
});

// Attach routes
app.use(router);

// Mount app
app.mount('#app');
