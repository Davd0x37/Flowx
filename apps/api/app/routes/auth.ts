import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import type { Schema } from 'mongoose';
import { Argon2id } from 'oslo/password';
import { UserType } from '@flowx/shared/models/user';
import { User } from 'app/models/user';
import { lucia } from 'app/plugins/auth';

const UserCredentials = Type.Pick(UserType, ['login', 'password']);
type UserCredentials = Static<typeof UserCredentials>;

const NewUserType = Type.Pick(UserType, ['login', 'password', 'avatar']);
type NewUserType = Static<typeof NewUserType>;

export default (fastify: FastifyInstance, _options: FastifyPluginOptions, done: () => void) => {
  const fastifyTypeBox = fastify
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>();

  fastifyTypeBox.post(
    '/auth/login',
    {
      schema: {
        body: UserCredentials,
      },
    },
    async (request, response) => {
      const { login, password } = request.body;

      try {
        const user = await User.findOne({ login });
        if (!user) return response.badRequest('Cannot find user');

        const validatePassword = await new Argon2id().verify(user.password, password);
        if (!validatePassword) return response.badRequest('Incorrect password');

        const session = await lucia.createSession(user.id as Schema.Types.ObjectId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        response.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return response.code(200).send({ status: 'Successfully logged in' });
      } catch (error) {
        console.error(error);
        return response.badRequest('Cannot login!');
      }
    },
  );

  fastifyTypeBox.post(
    '/auth/signup',
    {
      schema: {
        body: NewUserType,
      },
    },
    async (request, response) => {
      const { login, password, avatar } = request.body;

      // Hash before checking if user exists to minimize timing attacks
      const hashedPassword = await new Argon2id().hash(password);

      try {
        const exists = await User.exists({ login });
        if (exists) return response.badRequest('User already exists');

        const newUser = await User.create({
          login,
          password: hashedPassword,
          isOnline: false,
          avatar,
          lastActive: new Date(),
        });

        const session = await lucia.createSession(newUser.id as Schema.Types.ObjectId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        response.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return response.code(200).send('User created');
      } catch (error) {
        return response.badRequest('Cannot create an account!');
      }
    },
  );

  done();
};
