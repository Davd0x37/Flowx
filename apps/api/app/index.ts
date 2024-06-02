import { API_PREFIX, isDev } from './common/config';
import { logger } from './common/logger';
import Plugins from './plugins';
// import Routes from './routes';
import autoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import { join } from 'node:path';

// Fastify instance
const fastify = Fastify({
  logger: isDev ? logger : true,
});

try {
  // Autoload plugins
  await fastify.register(Plugins);

  await fastify.register(autoLoad, {
    dir: join(import.meta.dirname, 'routes'),
    ignorePattern: /^.*(?:disable).ts$/,
    options: { prefix: API_PREFIX },
  });

  await fastify.listen({
    host: fastify.config.API_HOST,
    port: fastify.config.API_PORT,
  });
} catch (err) {
  fastify.log.error(err);

  throw new Error(`Server error: FASTIFY_ERROR`);
}
