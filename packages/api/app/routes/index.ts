import Auth from './auth';
import User from './user';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { API_PREFIX } from 'app/common/config';

export default fastifyPlugin(async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const { register } = fastify;

  await Promise.all([
    register(User, {
      prefix: API_PREFIX,
    }),

    register(Auth, {
      prefix: API_PREFIX,
    }),
  ]);
});