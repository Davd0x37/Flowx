import Fastify from 'fastify';
import Plugins from 'app/plugins';
import Routes from 'app/routes';

/**
 * @TODO: add error handling for unavailable services
 */

// Fastify instance
const fastify = Fastify({
  logger: true,
});

// Register plugins (database, fetch, auth, etc.) and middlewares (security, logging, etc.)
Plugins.forEach((plugin) => plugin(fastify));

// Register routes (auth, graphql)
Routes.forEach((route) => {
  fastify.register(route);
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
