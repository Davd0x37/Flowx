import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import type { Schema } from 'mongoose';
import { Argon2id } from 'oslo/password';
import { UserType } from '@flowx/shared/models/user';
import { User } from 'app/models/user';
import { lucia } from 'app/plugins/auth';

const UserCredentials = Type.Pick(UserType, ['login', 'password']);
type UserCredentials = Static<typeof UserCredentials>;

const NewModifiedUser = Type.Pick(UserType, ['login', 'password', 'avatar']);
type NewModifiedUser = Static<typeof NewModifiedUser>;

// @TODO: refactor validation, use more generic error messages
export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastifyTypeBox = fastify.withTypeProvider<TypeBoxTypeProvider>();

  fastifyTypeBox.post<{ Body: UserCredentials }>('/auth/login', async (request, response) => {
    const { login, password } = request.body;

    // @TODO: trim and serialize?
    if (!login || login.length < 4 || login.length > 64) {
      return response.badRequest('Invalid login');
    }

    if (!password || password.length < 8 || password.length > 1024) {
      // @TODO: maybe use other error code instead of 400?
      return response.badRequest('Invalid password');
    }

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
  });

  fastifyTypeBox.post<{ Body: NewModifiedUser }>('/auth/signup', async (request, response) => {
    const { login, password, avatar } = request.body;

    // @TODO: trim and serialize?
    if (!login || login.length < 5 || login.length > 64) {
      return response.badRequest('Invalid login');
    }

    if (!password || password.length < 8 || password.length > 1024) {
      // @TODO: maybe use other error code instead of 400?
      return response.badRequest('Invalid password');
    }

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
  });
};
