import 'dotenv/config';
import helmet from '@fastify/helmet';
import Fastify from 'fastify';
import Plugins from './plugins';
import Routes from './routes';

// Fastify instance
const fastify = Fastify({
  logger: true,
});

// Register security/logging/other plugins
fastify.register(helmet);

// Register plugins (database, fetch, auth, etc.)
Plugins.forEach((plugin) => {
  fastify.register(plugin);
});

// Register routes (auth, graphql)
Routes.forEach((route) => {
  fastify.register(route);
});

fastify.get('/', async (_request, _reply) => {
  return { hello: 'world' };
});

(async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
