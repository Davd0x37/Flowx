import {
  HealthCheckRouteResponse,
  healthcheckServerEndpoint,
} from '@flowx/api_types/routes/healthcheck'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createFastifyTypeProvider } from '~/common/fastifyTypeProvider'

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance)

  fastify.get(
    healthcheckServerEndpoint,
    {
      schema: {
        response: {
          '2xx': HealthCheckRouteResponse,
        },
      },
    },
    async (_request, reply) => {
      return reply.code(200).send({
        message: 'Server is running',
      })
    },
  )
}
