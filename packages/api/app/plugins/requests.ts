import Cors from '@fastify/cors';
import FormBody from '@fastify/formbody';
import Helmet from '@fastify/helmet';
import UnderPressure from '@fastify/under-pressure';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { verifyRequestOrigin } from 'lucia';
import { isDev } from 'app/common/config';

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const { register } = fastify;

    // Multipart form body handler
    await register(FormBody);

    // Register Helmet - change HTTP response headers
    await register(Helmet);

    // Configure CORS
    await register(Cors, {
      origin: false,
    });

    // Process load handler
    await register(UnderPressure, {
      maxEventLoopDelay: 1000,
      maxHeapUsedBytes: 1000000000,
      maxRssBytes: 1000000000,
      maxEventLoopUtilization: 0.98,
    });

    // For Lucia auth
    // https://lucia-auth.com/guides/validate-session-cookies/
    fastify.addHook('preHandler', (request, reply, done) => {
      if (request.method === 'GET') return done();
      // Disable in dev environment
      if (isDev) return done();

      const {
        // Only required in non-GET requests (POST, PUT, DELETE, PATCH, etc)
        origin: originHeader,
        // NOTE: You may need to use `X-Forwarded-Host` instead
        // From fastify documentation:
        // hostname - the host of the incoming request (derived from X-Forwarded-Host header when the trustProxy option is enabled)
        // check hostname when load balancer will be implemented
        host: hostHeader,
      } = request.headers;

      if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
        return reply.forbidden('Invalid origin');
      }
    });
  },
  {
    name: 'requests',
    dependencies: ['dotenv', 'base'],
  },
);