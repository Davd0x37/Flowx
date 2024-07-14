import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  GetUsersErrorResponseSchema,
  GetUsersSuccessResponseSchema,
} from '@flowx/api_types/routes/users';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';
import { User } from 'app/models/user';

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  /**
   * Get all users
   */
  fastify.get(
    '/',
    {
      schema: {
        response: {
          '2xx': GetUsersSuccessResponseSchema,
          '4xx': GetUsersErrorResponseSchema,
        },
      },
    },
    async (_request, reply) => {
      const users = await User.find({});
      if (users.length === 0) {
        return reply.status(404).send({
          error: {
            message: 'No users found!',
          },
        });
      }

      return await reply.status(200).send({ data: users });
    },
  );
};
