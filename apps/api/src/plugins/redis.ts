import redis, { type FastifyRedisPluginOptions } from '@fastify/redis'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

// Redis integration
export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const {
      register,
      config: { REDIS_HOST, REDIS_PORT },
    } = fastify

    const redisOptions = {
      host: REDIS_HOST,
      port: REDIS_PORT,
      closeClient: true,
    } satisfies FastifyRedisPluginOptions

    await register(redis, redisOptions)
  },
  {
    name: 'redis',
    decorators: { fastify: ['config'] },
    dependencies: ['dotenv', 'base'],
  },
)
