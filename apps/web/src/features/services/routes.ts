import { Vault } from 'app/assets/icons';
import router from 'app/routes';
import { ServiceList } from './views';

router.addRoute({
  path: '/services',
  name: 'services',
  component: ServiceList,
  meta: {
    title: 'services.title',
    icon: Vault,
  },
});

export default {};
