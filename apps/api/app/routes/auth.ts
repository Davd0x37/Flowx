import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import type { Schema } from 'mongoose';
import { Argon2id } from 'oslo/password';
import { UserType } from '@flowx/shared/models/user';
import { ApiResponseWrapper } from '@flowx/shared/types/index';
import { User } from 'app/models/user';
import { lucia } from 'app/plugins/auth';

const UserCredentials = Type.Pick(UserType, ['email', 'password']);
type UserCredentials = Static<typeof UserCredentials>;

const NewUserType = Type.Pick(UserType, ['email', 'password', 'avatar']);
type NewUserType = Static<typeof NewUserType>;

export default (fastify: FastifyInstance, _options: FastifyPluginOptions, done: () => void) => {
  const fastifyTypeBox = fastify
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>();

  fastifyTypeBox.post(
    '/auth/login',
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
    async (request, response) => {
      const { email, password } = request.body;

      try {
        const user = await User.findOne({ email });
        if (!user)
          return response.code(404).send({
            status: 'Error',
            error: {
              code: 404,
              message: 'User does not exist!',
            },
          });

        const validatePassword = await new Argon2id().verify(user.password, password);
        if (!validatePassword)
          return response.code(400).send({
            status: 'Error',
            error: {
              code: 400,
              message: 'Invalid password',
              data: {
                field: 'password',
              },
            },
          });

        const session = await lucia.createSession(user.id as Schema.Types.ObjectId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        response.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return response.code(200).send({ status: 'Success', message: 'Successfully logged in' });
      } catch (error) {
        return response.code(400).send({
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

  fastifyTypeBox.post(
    '/auth/signup',
    {
      schema: {
        body: NewUserType,
        response: {
          '4xx': ApiResponseWrapper,
          '2xx': ApiResponseWrapper,
        },
      },
    },
    async (request, response) => {
      const { email, password, avatar } = request.body;

      // Hash before checking if user exists to minimize timing attacks
      const hashedPassword = await new Argon2id().hash(password);

      try {
        const exists = await User.exists({ email: email });
        if (exists)
          return response.code(400).send({
            status: 'Error',
            error: {
              code: 400,
              message: 'User already exists',
            },
          });

        const newUser = await User.create({
          email,
          password: hashedPassword,
          isOnline: false,
          avatar,
          lastActive: new Date(),
        });

        const session = await lucia.createSession(newUser.id as Schema.Types.ObjectId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        response.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return response.code(200).send({
          status: 'Success',
          message: 'User created',
        });
      } catch (error) {
        return response.code(400).send({
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

  done();
};
