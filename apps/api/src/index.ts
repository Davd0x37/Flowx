import 'dotenv/config';

import FastifyFormBody from '@fastify/formbody';
import helmet from '@fastify/helmet';
// import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';

import Plugins from './plugins';
import Routes from './routes';

// Fastify instance
const fastify = Fastify({
  logger: true,
});
// .withTypeProvider<TypeBoxTypeProvider>();

// Register security/logging/other plugins
fastify.register(helmet);

// Multipart form body handler
fastify.register(FastifyFormBody);

// Register plugins (database, fetch, auth, etc.)
Plugins.forEach((plugin) => {
  fastify.register(plugin);
});

// Register routes (auth, graphql)
Routes.forEach((route) => {
  fastify.register(route);
});

// (async () => {
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
// })();
