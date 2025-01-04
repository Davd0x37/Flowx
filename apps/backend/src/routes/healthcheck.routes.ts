import type { FastifyInstance } from 'fastify'
import { HealthCheckRoute } from '@flowx/api'
import { createFastifyTypeProvider } from '../utils/type-provider'

export default (fastifyInstance: FastifyInstance) => {
  // Fastify with zod type provider
  const fastify = createFastifyTypeProvider(fastifyInstance)

  fastify.route({
    handler: async () => {
      return {
        message: 'OK',
      }
    },
    method: HealthCheckRoute.method,
    schema: {
      response: {
        200: HealthCheckRoute.schema.response,
      },
    },
    url: HealthCheckRoute.path,
  })
}
