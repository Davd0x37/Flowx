import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { API_PREFIX, isDev } from '~/common/config'

// Swagger integration
export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const {
      register,
      config: { API_HOST, API_PORT },
    } = fastify

    const host = isDev ? `localhost:${API_PORT}` : API_HOST

    // @TODO: maybe remove options from swagger and keep them only in swagger-ui?
    await register(fastifySwagger, {
      swagger: {
        info: {
          title: 'Flowx API',
          description: 'Flowx API documentation',
          version: '0.0.1',
        },
        host,
        schemes: ['http', 'https'],
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json'],
      },
    })

    await register(fastifySwaggerUI, {
      routePrefix: `${API_PREFIX}/documentation`,
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      uiHooks: {
        onRequest: (_request, _reply, next) => {
          next()
        },
        preHandler: (_request, _reply, next) => {
          next()
        },
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, _request, _reply) => {
        return swaggerObject
      },
      transformSpecificationClone: true,
    })
  },
  {
    name: 'swagger',
    dependencies: ['dotenv', 'base', 'mongo'],
  },
)
