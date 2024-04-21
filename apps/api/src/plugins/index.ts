import { AppFastifyPlugin } from '../types/fastify';
import base from './base';
import kysely from './kysely';
import redis from './redis';
import swagger from './swagger';
import { FastifyInstance } from 'fastify';

const plugins: AppFastifyPlugin = async (fastify: FastifyInstance): Promise<void> => {
  await base(fastify);
  await redis(fastify);
  await kysely(fastify);
  await swagger(fastify);
};

export default plugins;
