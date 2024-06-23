import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ApiResponseWrapper } from '@flowx/shared/types/index';
import { lucia } from 'app/common/auth';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';

// @TODO: do I really need this? Maybe I can just check if the session is valid in prehandlers?
// this will be only used for checking if the session is valid after the user enters app
// after few days of inactivity
export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.get(
    '/check-session',
    {
      schema: {
        consumes: ['application/x-www-form-urlencoded'],
        response: {
          '4xx': ApiResponseWrapper,
          '2xx': ApiResponseWrapper,
        },
      },
      preHandler: async () => {
        // Disable all prehandlers for this route
      },
    },
    async (request, reply) => {
      try {
        const sessionId = lucia.readSessionCookie(request.headers.cookie ?? '');

        if (!sessionId) {
          return reply.code(400).send({
            status: 'Error',
            error: {
              code: 400,
              message: 'User is logged out!',
            },
          });
        }

        const { session } = await lucia.validateSession(sessionId);
        if (session && session.fresh) {
          return reply.code(400).send({
            status: 'Error',
            error: {
              code: 400,
              message: 'User is logged out!',
            },
          });
        }

        if (!session) {
          return reply.code(400).send({
            status: 'Error',
            error: {
              code: 400,
              message: 'User is logged out!',
            },
          });
        }

        return reply.code(200).send({ status: 'Success', message: 'User is logged!' });
      } catch (error) {
        fastify.log.error(error);

        return reply.code(400).send({
          status: 'Error',
          error: {
            code: 400,
            message: 'User is logged out!',
          },
        });
      }
    },
  );
};
