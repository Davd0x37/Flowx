import { isDev } from './common/config';
import { logger } from './common/logger';
import Plugins from './plugins';
import Routes from './routes';
import Fastify from 'fastify';

// Fastify instance
const fastify = Fastify({
  logger: isDev ? logger : true,
});

try {
  // Autoload plugins
  await fastify.register(Plugins);

  // Autoload routes
  await fastify.register(Routes);

  await fastify.listen({ port: fastify.config.PORT });
} catch (err) {
  fastify.log.error(err);

  throw new Error(`Server error: FASTIFY_ERROR`);
}
