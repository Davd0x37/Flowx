import Auth from './auth';
import Healthcheck from './healthcheck';
import Users from './users';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const { register } = fastify;

  await Promise.all([
    // Healthcheck endpoint
    register(Healthcheck),

    // Users endpoints
    register(Users, {
      prefix: '/users',
    }),

    // Auth endpoints
    register(Auth, {
      prefix: '/auth',
    }),
  ]);
};
