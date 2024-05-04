import Sensible from '@fastify/sensible';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const { register } = fastify;

    // Fastify utils
    await register(Sensible);
  },
  {
    name: 'base',
    dependencies: ['dotenv'],
  },
);
