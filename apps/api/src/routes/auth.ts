import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  fastify.get('/auth/:test', async (request, response) => {
    response.send('test response');
  });
};
