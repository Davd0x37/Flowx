import type { Session, User } from '@prisma/client'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import prisma from '../db/connect'
import SessionRepository from '../repositories/session.repository'
import SessionService from '../services/session.service'

const sessionRepository = new SessionRepository(prisma)
const sessionService = new SessionService(sessionRepository)

export default fastifyPlugin(
  (fastify: FastifyInstance, _options: FastifyPluginOptions, done) => {
    fastify.addHook('preHandler', async (req) => {
      const { session, user } =
        await sessionService.validateAuthRequestEvent(req)

      req.user = user
      req.session = session
    })

    done()
  },
  {
    dependencies: ['dotenv', 'base'],
    name: 'auth',
  },
)

declare module 'fastify' {
  interface FastifyRequest {
    session: null | Session
    user: null | User
  }
}
