import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createFastifyTypeProvider } from 'app/common/fastifyTypeProvider';
import { User } from 'app/models/user';

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance);

  fastify.get('/', async (_request, reply) => {
    const users = await User.find({});

    await reply.send(users);
  });
};
