import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  LogoutErrorResponseSchema,
  LogoutSuccessResponseSchema,
  logoutServerEndpoint,
} from '@flowx/api_types/routes/auth';
import { lucia, validateAuth } from 'app/common/auth';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  /**
   * Logout user, invalidate session and remove session cookie
   */
  fastify.post(
    logoutServerEndpoint,
    {
      schema: {
        response: {
          '2xx': LogoutSuccessResponseSchema,
          '4xx': LogoutErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { session, user: _user } = await validateAuth(
        request.headers.cookie,
        (name, value, attributes) => {
          reply.setCookie(name, value, attributes);
        },
      );

      if (!session) {
        return reply.code(404).send({
          error: {
            message: 'Session does not exist!',
          },
        });
      }

      await lucia.invalidateSession(session.id);
      const blankSessionCookie = lucia.createBlankSessionCookie();
      reply.setCookie(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes,
      );

      return reply.code(200).send({
        message: 'Logged out',
      });
    },
  );
};
