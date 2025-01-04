import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyPlugin from 'fastify-plugin'
import { PREFIX } from '../config/api'
import { isDev } from '../utils/env'

// Swagger integration
export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const {
      config: { HOST, PORT },
      register,
    } = fastify

    const host = isDev ? `localhost:${PORT}` : HOST

    // @TODO: maybe remove options from swagger and keep them only in swagger-ui?
    await register(fastifySwagger, {
      swagger: {
        consumes: ['application/json', 'multipart/form-data'],
        host,
        info: {
          description: 'Flowx API documentation',
          title: 'Flowx API',
          version: '0.0.1',
        },
        produces: ['application/json'],
        schemes: ['http', 'https'],
      },
    })

    await register(fastifySwaggerUI, {
      routePrefix: `${PREFIX}/documentation`,
      staticCSP: true,
      transformSpecification: (swaggerObject, _request, _reply) => {
        return swaggerObject
      },
      transformSpecificationClone: true,
      transformStaticCSP: (header) => header,
      uiConfig: {
        deepLinking: false,
        docExpansion: 'full',
      },
      uiHooks: {
        onRequest: (_request, _reply, next) => {
          next()
        },
        preHandler: (_request, _reply, next) => {
          next()
        },
      },
    })
  },
  {
    dependencies: ['dotenv', 'base'],
    name: 'swagger',
  },
)
