import type { FastifyInstance, FastifyPluginOptions, FastifyReply } from 'fastify';
import {
  CheckSessionErrorResponseSchema,
  CheckSessionSuccessResponseSchema,
  checkSessionServerEndpoint,
} from '@flowx/api_types/routes/auth';
import { lucia } from 'app/common/auth';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';

// @TODO: do I really need this? Maybe I can just check if the session is valid in prehandlers?
// this will be only used for checking if the session is valid after the user enters app
// after few days of inactivity
export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  const replyUserLoggedOut = (reply: FastifyReply) => {
    return reply.code(401).send({
      error: {
        message: 'User is logged out!',
      },
    });
  };

  /**
   * Check if user session is valid, if not, return 401
   */
  fastify.get(
    checkSessionServerEndpoint,
    {
      schema: {
        consumes: ['application/x-www-form-urlencoded'],
        response: {
          '2xx': CheckSessionSuccessResponseSchema,
          '4xx': CheckSessionErrorResponseSchema,
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
          return replyUserLoggedOut(reply);
        }

        const { session } = await lucia.validateSession(sessionId);
        if (session && session.fresh) {
          return replyUserLoggedOut(reply);
        }

        if (!session) {
          return replyUserLoggedOut(reply);
        }

        return reply.code(200).send({ message: 'User is logged!' });
      } catch (error) {
        fastify.log.error(error);

        return replyUserLoggedOut(reply);
      }
    },
  );
};
