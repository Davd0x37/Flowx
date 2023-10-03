import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { Home as HomeIcon } from 'app/assets/icons';
import { Home, NotFound } from 'app/views';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'home.title',
      icon: HomeIcon,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      displayInNav: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
