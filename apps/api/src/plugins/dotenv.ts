import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { type EnvSchema, env } from '~/common/env'

export default fastifyPlugin(
  (fastify: FastifyInstance, _options: FastifyPluginOptions, done) => {
    fastify.decorate('config', env)

    done()
  },
  {
    name: 'dotenv',
  },
)

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvSchema
  }
}
