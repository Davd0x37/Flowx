import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Argon2id } from 'oslo/password';
import { UserType } from '@flowx/shared/models/user';
import { ApiResponseWrapper } from '@flowx/shared/types/index';
import { lucia } from 'app/common/auth';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';
import { User } from 'app/models/user';

const UserCredentials = Type.Pick(UserType, ['email', 'password']);
type UserCredentials = Static<typeof UserCredentials>;

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.post(
    '/login',
    {
      schema: {
        consumes: ['application/x-www-form-urlencoded'],
        body: UserCredentials,
        response: {
          '4xx': ApiResponseWrapper,
          '2xx': ApiResponseWrapper,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return reply.code(404).send({
            status: 'Error',
            error: {
              code: 404,
              message: 'User does not exist!',
              data: {
                field: 'email',
              },
            },
          });
        }

        const validatePassword = await new Argon2id().verify(user.password, password);
        if (!validatePassword) {
          return reply.code(400).send({
            status: 'Error',
            error: {
              code: 400,
              message: 'Invalid password',
              data: {
                field: 'password',
              },
            },
          });
        }

        const session = await lucia.createSession(user._id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        reply.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return reply.code(200).send({ status: 'Success', message: 'Successfully logged in' });
      } catch (error) {
        fastify.log.error(error);

        return reply.code(400).send({
          status: 'Error',
          error: {
            code: 400,
            message: 'Cannot login',
            // @FIXME: check if it doesn't leak any user details
            data: { error },
          },
        });
      }
    },
  );
};
