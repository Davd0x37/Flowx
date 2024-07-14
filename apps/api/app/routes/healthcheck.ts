import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { HealthCheckRouteResponse } from '@flowx/api_types/routes/healthcheck';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.get(
    '/healthcheck',
    {
      schema: {
        response: {
          '2xx': HealthCheckRouteResponse,
        },
      },
    },
    async (_request, reply) => {
      return reply.code(200).send({
        message: 'Server is running',
      });
    },
  );
};
