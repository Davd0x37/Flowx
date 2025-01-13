import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import Cookies from '@fastify/cookie'
import Sensible from '@fastify/sensible'
import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const {
      config: { COOKIE_SECRET },
      register,
    } = fastify

    // Fastify utils
    await register(Sensible)

    // Fastify cookies
    await register(Cookies, {
      parseOptions: {},
      secret: COOKIE_SECRET,
    })
  },
  {
    dependencies: ['dotenv'],
    name: 'base',
  },
)
