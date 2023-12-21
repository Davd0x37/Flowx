import 'dotenv/config';

import FastifyFormBody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import redis from '@fastify/redis';
import Fastify from 'fastify';

import Plugins from './plugins';
import Routes from './routes';

const { REDIS_HOST } = process.env;

// Fastify instance
const fastify = Fastify({
  logger: true,
});

// Register security/logging/other plugins
fastify.register(helmet);

// Multipart form body handler
fastify.register(FastifyFormBody);

if (REDIS_HOST) {
  // Redis integration
  fastify.register(redis, {
    host: REDIS_HOST,
  });
}

// Register plugins (database, fetch, auth, etc.)
Plugins.forEach((plugin) => {
  fastify.register(plugin);
});

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
