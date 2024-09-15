import type { UserID, UserType } from '@flowx/api_types/models/user'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import type { Session, User } from 'lucia'
import { type lucia as _lucia, validateAuth } from '~/common/auth'

export default fastifyPlugin(
  (fastify: FastifyInstance, _options: FastifyPluginOptions, done) => {
    fastify.addHook('preHandler', async (req, reply) => {
      const { user, session } = await validateAuth(
        req.headers.cookie,
        (name, value, attributes) => {
          reply.setCookie(name, value, attributes)
        },
      )

      req.user = user
      req.session = session
      return
    })

    done()
  },
  {
    name: 'auth',
    dependencies: ['dotenv', 'base', 'mongo'],
  },
)

type LoggedUser = Pick<UserType, 'email'>

declare module 'lucia' {
  interface Register {
    Lucia: typeof _lucia
    UserId: UserID
    DatabaseUserAttributes: LoggedUser
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null
    session: Session | null
  }
}
