import plugins from './plugins';
import routes from './routes';
import Fastify from 'fastify';

/**
 * @TODO: add error handling for unavailable services
 */

// Fastify instance
const fastify = Fastify({
  logger: true,
});

// Register plugins (database, fetch, auth, etc.) and middlewares (security, logging, etc.)
await plugins(fastify);

// Register routes (auth, graphql)
await routes(fastify);

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);

  throw new Error(`Server error: FASTIFY_ERROR`);
}
