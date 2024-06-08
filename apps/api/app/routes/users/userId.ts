import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { UserType } from '@flowx/shared/models/user';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';
import { User } from 'app/models/user';
import { UserIDObject } from 'app/types/user';

const NewModifiedUser = Type.Pick(UserType, ['email', 'password', 'avatar']);
type NewModifiedUser = Static<typeof NewModifiedUser>;

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.get(
    '/:userId',
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

  fastify.put(
    '/:userId',
    {
      schema: {
        body: NewModifiedUser,
        params: UserIDObject,
      },
    },
    async (request, reply) => {
      const { userId } = request.params;
      const { email, password, avatar } = request.body;

      try {
        const user = await User.findById(userId);
        if (!user) {
          await reply.forbidden('Cannot update user!');
          return;
        }

        user.email = email;
        user.password = password;
        user.avatar = avatar;

        await user.save();

        await reply.code(200).send('User updated');
      } catch (error) {
        await reply.forbidden('Cannot update user!');
      }
    },
  );

  fastify.delete(
    '/:userId',
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
};
