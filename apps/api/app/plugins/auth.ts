import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { type Session, type User } from 'lucia';
import { UserID, UserType } from '@flowx/api_types/models/user';
import { lucia, validateAuth } from 'app/common/auth';

export default fastifyPlugin(
  (fastify: FastifyInstance, _options: FastifyPluginOptions, done) => {
    fastify.addHook('preHandler', async (req, reply) => {
      const { user, session } = await validateAuth(
        req.headers.cookie,
        (name, value, attributes) => {
          reply.setCookie(name, value, attributes);
        },
      );

      req.user = user;
      req.session = session;
      return;
    });

    done();
  },
  {
    name: 'auth',
    dependencies: ['dotenv', 'base', 'mongo'],
  },
);

type LoggedUser = Pick<UserType, 'email'>;

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    UserId: UserID;
    DatabaseUserAttributes: LoggedUser;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null;
    session: Session | null;
  }
}
