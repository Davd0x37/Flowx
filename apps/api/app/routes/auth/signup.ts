import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { UserType } from '@flowx/shared/models/user';
import { ApiResponseWrapper } from '@flowx/shared/types/index';
import { lucia } from 'app/common/auth';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';
import { User } from 'app/models/user';

const NewUserType = Type.Pick(UserType, ['email', 'password', 'avatar']);
type NewUserType = Static<typeof NewUserType>;

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.post(
    '/signup',
    {
      schema: {
        body: NewUserType,
        response: {
          '4xx': ApiResponseWrapper,
          '2xx': ApiResponseWrapper,
        },
      },
    },
    async (request, reply) => {
      const { email, password, avatar } = request.body;

      // Hash before checking if user exists to minimize timing attacks
      const hashedPassword = await new Argon2id().hash(password);

      try {
        const exists = await User.exists({ email: email });
        if (exists) {
          return reply.code(400).send({
            status: 'Error',
            error: {
              code: 400,
              message: 'User already exists',
            },
          });
        }

        const userId = generateId(16);

        const newUser = await User.create({
          _id: userId,
          email,
          password: hashedPassword,
          isOnline: false,
          avatar,
          lastActive: new Date(),
        });

        const session = await lucia.createSession(newUser._id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        reply.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return reply.code(200).send({
          status: 'Success',
          message: 'User created',
        });
      } catch (error) {
        fastify.log.error(error);

        return reply.code(400).send({
          status: 'Error',
          error: {
            code: 400,
            message: 'Cannot create an account!',
            data: { error },
          },
        });
      }
    },
  );
};
