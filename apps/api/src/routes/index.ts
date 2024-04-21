import { AppFastifyPlugin } from '../types/fastify.ts';
import auth from './auth';
import user from './user';
import { FastifyInstance } from 'fastify';

const routes: AppFastifyPlugin = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(auth);
  await fastify.register(user);
};

export default routes;
