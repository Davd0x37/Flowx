import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
// import { Value } from '@sinclair/typebox/value';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import UserRepository from 'app/repositories/user.repository';
import type { NewUserRouteSchemeType } from 'app/types/routes';
import type { UserIDType } from 'app/types/user';

export default (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastifyTypeBox = fastify.withTypeProvider<TypeBoxTypeProvider>();
  const userRepo = new UserRepository();

  fastifyTypeBox.get('/users', async (_request, response) => {
    const users = await userRepo.getAll();

    await response.send(users);
  });

  fastifyTypeBox.get<{ Params: UserIDType }>('/users/:userId', async (request, response) => {
    const { userId } = request.params;

    const user = await userRepo.read(userId);

    await response.send(user);
  });

  fastifyTypeBox.post<{ Body: NewUserRouteSchemeType }>('/users', async (request, response) => {
    const { login, password, avatar } = request.body;

    const user = await userRepo.create({ login, password, avatar });

    if (user) {
      await response.code(200).send('User created');
    } else {
      await response.code(403).send('Cannot create user!');
    }
  });

  fastifyTypeBox.put<{ Body: NewUserRouteSchemeType; Params: UserIDType }>(
    '/users/:userId',
    async (request, response) => {
      const { userId } = request.params;
      const { login, password, avatar } = request.body;

      const createdUser = await userRepo.update(userId, { login, password, avatar });
      if (!createdUser) {
        await response.code(403).send('Cannot update user!');
        return;
      }

      await response.code(200).send('User updated');
    },
  );
};
