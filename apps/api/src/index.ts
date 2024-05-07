import { isDev } from './common/config';
import { logger } from './common/logger';
import AutoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import { resolve } from 'node:path';

// Fastify instance
const fastify = Fastify({
  logger: isDev ? logger : true,
});

try {
  // Autoload plugins
  await fastify.register(AutoLoad, {
    dir: resolve(import.meta.dirname, 'plugins'),
  });

  // Autoload routes
  await fastify.register(AutoLoad, {
    dir: resolve(import.meta.dirname, 'routes'),
    dirNameRoutePrefix: false,
  });

  await fastify.listen({ port: fastify.config.PORT });
} catch (err) {
  fastify.log.error(err);

  throw new Error(`Server error: FASTIFY_ERROR`);
}
