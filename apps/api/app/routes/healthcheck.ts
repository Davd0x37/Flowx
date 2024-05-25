import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, _options: FastifyPluginOptions, done: () => void) => {
  const fastifyTypeBox = fastify.withTypeProvider<TypeBoxTypeProvider>();

  fastifyTypeBox.get('/healthcheck', async (_request, response) => {
    return response.code(200).send();
  });

  done();
};
