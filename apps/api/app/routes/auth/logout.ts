import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ApiResponseWrapper } from '@flowx/shared/types/index';
import { lucia, validateAuth } from 'app/common/auth';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.post(
    '/logout',
    {
      schema: {
        response: {
          '4xx': ApiResponseWrapper,
          '2xx': ApiResponseWrapper,
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

      console.log(session);

      if (!session) {
        return reply.code(404).send({
          status: 'Error',
          error: {
            code: 404,
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
        status: 'Success',
        message: 'Logged out',
      });
    },
  );
};
