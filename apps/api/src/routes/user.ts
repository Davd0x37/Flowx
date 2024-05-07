import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { User, type UserIDObject, UserType } from 'app/models/user';

const NewModifiedUser = Type.Pick(UserType, ['login', 'password', 'avatar']);
type NewModifiedUser = Static<typeof NewModifiedUser>;

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastifyTypeBox = fastify.withTypeProvider<TypeBoxTypeProvider>();
  const { schemaValidator } = fastifyTypeBox;

  fastifyTypeBox.get('/users', async (_request, reply) => {
    const users = await User.find({});

    await reply.send(users);
  });

  fastifyTypeBox.get<{ Params: UserIDObject }>('/users/:userId', async (request, reply) => {
    const { userId } = request.params;

    const user = await User.findById(userId);

    await reply.send(user);
  });

  fastifyTypeBox.post('/users', { schema: { body: NewModifiedUser } }, async (req, reply) => {
    const { login, password, avatar } = req.body;

    // @TODO: add as plugin - preHandler maybe?
    schemaValidator.compile(NewModifiedUser)(req.body);

    // @TODO: check if create throws an error if user exists
    try {
      const exists = await User.exists({ login });
      if (exists) {
        await reply.forbidden('Cannot create user!');
        return;
      }

      const user = await User.create({ login, password, avatar });

      await reply.code(200).send({
        id: user.id,
      });
    } catch (error) {
      await reply.forbidden('Cannot create user!');
    }
  });

  fastifyTypeBox.put<{ Body: NewModifiedUser; Params: UserIDObject }>(
    '/users/:userId',
    async (request, reply) => {
      const { userId } = request.params;
      const { login, password, avatar } = request.body;

      try {
        const user = await User.findById(userId);
        if (!user) {
          await reply.forbidden('Cannot update user!');
          return;
        }

        // @TODO: refactor this
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

  fastifyTypeBox.delete<{ Params: UserIDObject }>('/users/:userId', async (request, reply) => {
    const { userId } = request.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      await reply.forbidden('Cannot delete user!');
      return;
    }

    await reply.code(200).send('User deleted!');
  });
};
