import root from './root';
import updateStatus from './updateStatus';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const { register } = fastify;

  await Promise.all([register(root), register(updateStatus)]);
};
