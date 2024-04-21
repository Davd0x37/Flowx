import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  fastify.get('/auth/:test', async (_request, response) => {
    await response.send('test response');
  });
};
