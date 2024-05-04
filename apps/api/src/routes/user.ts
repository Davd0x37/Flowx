import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { User, type UserIDObject } from 'app/models/user';
import type { NewUserRouteSchemeType } from 'app/types/routes';

export default (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastifyTypeBox = fastify.withTypeProvider<TypeBoxTypeProvider>();

  fastifyTypeBox.get('/users', async (_request, response) => {
    const users = await User.find({});

    await response.send(users);
  });

  fastifyTypeBox.get<{ Params: UserIDObject }>('/users/:userId', async (request, response) => {
    const { userId } = request.params;

    const user = await User.findById(userId);

    await response.send(user);
  });

  fastifyTypeBox.post<{ Body: NewUserRouteSchemeType }>('/users', async (request, response) => {
    const { login, password, avatar } = request.body;

    // @TODO: check if create throws an error if user exists
    try {
      const exists = await User.exists({ login });
      if (exists) {
        await response.forbidden('Cannot create user!');
        return;
      }

      const user = await User.create({ login, password, avatar });

      await response.code(200).send({
        id: user.id,
      });
    } catch (error) {
      await response.forbidden('Cannot create user!');
    }
  });

  fastifyTypeBox.put<{ Body: NewUserRouteSchemeType; Params: UserIDObject }>(
    '/users/:userId',
    async (request, response) => {
      const { userId } = request.params;
      const { login, password, avatar } = request.body;

      try {
        const user = await User.findById(userId);
        if (!user) {
          await response.forbidden('Cannot update user!');
          return;
        }

        // @TODO: refactor this
        user.login = login;
        user.password = password;
        user.avatar = avatar;

        await user.save();

        await response.code(200).send('User updated');
      } catch (error) {
        await response.forbidden('Cannot update user!');
      }
    },
  );

  fastifyTypeBox.delete<{ Params: UserIDObject }>('/users/:userId', async (request, response) => {
    const { userId } = request.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      await response.forbidden('Cannot delete user!');
      return;
    }

    await response.code(200).send('User deleted!');
  });
};
