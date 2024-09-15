import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import root from './root'
import userId from './userId'

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  const { register } = fastify

  await Promise.all([register(root), register(userId)])
}
