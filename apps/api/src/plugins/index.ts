import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import Auth from './auth'
import Base from './base'
import Dotenv from './dotenv'
import Mongo from './mongo'
// import Redis from './redis';
import Requests from './requests'
import SchemaValidator from './schemaValidator'
import Swagger from './swagger'

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const { register } = fastify

    await register(Dotenv)
    await register(Base)
    await register(SchemaValidator)

    await Promise.all([
      register(Mongo),
      // register(Redis),
      register(Auth),
      register(Requests),
      register(Swagger),
    ])
  },
  {
    name: 'plugins',
  },
)
