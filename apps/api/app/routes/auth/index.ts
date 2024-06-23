import checkSession from './checkSession';
import login from './login';
import logout from './logout';
import signup from './signup';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const { register } = fastify;

  await Promise.all([
    register(login),
    register(logout),
    register(signup),
    // Session check for users who are inactive for a long time
    register(checkSession),
  ]);
};
