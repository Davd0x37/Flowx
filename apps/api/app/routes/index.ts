import Auth from './auth';
import Healthcheck from './healthcheck';
import Me from './me';
import Users from './users';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const { register } = fastify;

  await Promise.all([
    // Healthcheck endpoint
    register(Healthcheck),

    // Current user endpoints
    register(Me),

    // Users endpoints
    register(Users),

    // Auth endpoints
    register(Auth),
  ]);
};
