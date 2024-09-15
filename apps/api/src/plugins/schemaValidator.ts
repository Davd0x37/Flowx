import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { type SchemaValidatorType, schemaValidator } from '~/common/schema'

export default fastifyPlugin(
  (fastify: FastifyInstance, _options: FastifyPluginOptions, done) => {
    fastify.decorate('schemaValidator', schemaValidator)

    done()
  },
  {
    name: 'schemaValidator',
    dependencies: ['dotenv', 'base'],
  },
)

declare module 'fastify' {
  interface FastifyInstance {
    schemaValidator: SchemaValidatorType
  }
}
