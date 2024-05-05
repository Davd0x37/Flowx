import Cors from '@fastify/cors';
import FormBody from '@fastify/formbody';
import Helmet from '@fastify/helmet';
import UnderPressure from '@fastify/under-pressure';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

// import { verifyRequestOrigin } from 'lucia';

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
    // Original author - https://github.com/lucia-auth/lucia/issues/1406#issuecomment-1942424121
    // fastify.addHook('preHandler', (req, res, done) => {
    //   if (req.method === 'GET') {
    //     return done();
    //   }

    //   const originHeader = req.headers.origin ?? null;
    //   const hostHeader = req.headers.host ?? null;
    //   if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
    //     console.error('Invalid origin', { originHeader, hostHeader });
    //     return res.status(403);
    //   }
    // });
  },
  {
    name: 'requests',
    dependencies: ['dotenv', 'base'],
  },
);
