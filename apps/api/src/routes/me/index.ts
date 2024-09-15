import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import root from './root'
import updateStatus from './updateStatus'

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const { register } = fastify

  await Promise.all([register(root), register(updateStatus)])
}
