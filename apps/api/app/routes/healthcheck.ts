import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ApiResponseWrapper } from '@flowx/shared/types/index';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.get(
    '/healthcheck',
    {
      schema: {
        response: {
          '2xx': ApiResponseWrapper,
        },
      },
    },
    async (_request, reply) => {
      return reply.code(200).send({
        status: 'Success',
        message: 'Server is running',
      });
    },
  );
};
