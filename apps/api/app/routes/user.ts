import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import type { Schema } from 'mongoose';
import { UserIDObject, UserType } from '@flowx/shared/models/user';
import { User } from 'app/models/user';

const NewModifiedUser = Type.Pick(UserType, ['login', 'password', 'avatar']);
type NewModifiedUser = Static<typeof NewModifiedUser>;

export default (fastify: FastifyInstance, _options: FastifyPluginOptions, done: () => void) => {
  const fastifyTypeBox = fastify
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>();

  fastifyTypeBox.get('/users', async (_request, reply) => {
    const users = await User.find({});

    await reply.send(users);
  });

  fastifyTypeBox.get(
    '/users/:userId',
    {
      schema: {
        params: UserIDObject,
      },
    },
    async (request, reply) => {
      const { userId } = request.params;

      const user = await User.findById(userId);

      await reply.send(user);
    },
  );

  fastifyTypeBox.post(
    '/users',
    {
      schema: {
        body: NewModifiedUser,
      },
    },
    async (req, reply) => {
      const { login, password, avatar } = req.body;

      try {
        const exists = await User.exists({ login });
        if (exists) {
          await reply.forbidden('Cannot create user!');
          return;
        }

        const user = await User.create({ login, password, avatar });

        await reply.code(200).send({
          id: user.id as Schema.Types.ObjectId,
        });
      } catch (error) {
        await reply.forbidden('Cannot create user!');
      }
    },
  );

  fastifyTypeBox.put(
    '/users/:userId',
    {
      schema: {
        body: NewModifiedUser,
        params: UserIDObject,
      },
    },
    async (request, reply) => {
      const { userId } = request.params;
      const { login, password, avatar } = request.body;

      try {
        const user = await User.findById(userId);
        if (!user) {
          await reply.forbidden('Cannot update user!');
          return;
        }

        user.login = login;
        user.password = password;
        user.avatar = avatar;

        await user.save();

        await reply.code(200).send('User updated');
      } catch (error) {
        await reply.forbidden('Cannot update user!');
      }
    },
  );

  fastifyTypeBox.delete(
    '/users/:userId',
    {
      schema: {
        params: UserIDObject,
      },
    },
    async (request, reply) => {
      const { userId } = request.params;

      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        await reply.forbidden('Cannot delete user!');
        return;
      }

      await reply.code(200).send('User deleted!');
    },
  );

  done();
};
