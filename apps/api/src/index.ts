import Fastify from 'fastify'
import { API_PREFIX } from './common/config'
import { logger } from './common/logger'
import Plugins from './plugins'
import Routes from './routes'

// Fastify instance
const fastify = Fastify({
  loggerInstance: logger,
})

try {
  // Autoload plugins
  await fastify.register(Plugins)

  // Autoload routes
  await fastify.register(Routes, {
    prefix: API_PREFIX,
  })

  await fastify.listen({
    host: fastify.config.API_HOST,
    port: fastify.config.API_PORT,
  })
} catch (err) {
  fastify.log.error(err)

  throw new Error('Server error: FASTIFY_ERROR')
}
