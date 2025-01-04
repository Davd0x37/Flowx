import type { ApiErrorResponse } from '@flowx/api'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import process from 'node:process'
import { PREFIX } from './config/api'
import auth from './plugins/auth'
import base from './plugins/base'
import dotenv from './plugins/dotenv'
import requests from './plugins/requests'
import swagger from './plugins/swagger'
import authRoutes from './routes/auth.routes'
import healthcheckRoutes from './routes/healthcheck.routes'
import userRoutes from './routes/user.routes'
import { logger } from './utils/logger'

const createServer = async () => {
  // Fastify instance
  const fastify = Fastify({
    loggerInstance: logger,
  })
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)

  // Global error handler
  fastify.setErrorHandler((error, _request, reply) => {
    const statusCode = error.statusCode || 500
    const errorCode = error.name || 'INTERNAL_ERROR'
    const errorMessage = error.message || 'Internal server error'
    const errorData = 'data' in error ? error.data : {}

    const replyObject: ApiErrorResponse = {
      error: {
        code: errorCode,
        data: errorData,

        message: errorMessage,
      },
      status: false,
    }

    reply.status(statusCode).send(replyObject)
  })

  // Register plugins
  await fastify.register(dotenv, { prefix: PREFIX })
  await fastify.register(base, { prefix: PREFIX })
  await fastify.register(auth, { prefix: PREFIX })
  await fastify.register(requests, { prefix: PREFIX })
  await fastify.register(swagger, { prefix: PREFIX })

  // Auth route
  await fastify.register(authRoutes, { prefix: PREFIX })
  // User route
  await fastify.register(userRoutes, { prefix: PREFIX })
  // Healthcheck
  await fastify.register(healthcheckRoutes, { prefix: PREFIX })

  return fastify
}

const startServer = async () => {
  try {
    const server = await createServer()

    await server.listen({
      host: server.config.HOST,
      port: server.config.PORT,
    })

    server.log.info('Server started successfully')
  } catch (err) {
    console.log(err)
    logger.error('Error starting server:', err)
    process.exit(1)
  }
}

startServer()
