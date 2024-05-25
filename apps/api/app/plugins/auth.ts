import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Lucia, type Session, type User } from 'lucia';
import { Collection } from 'mongodb';
import mongoose from 'mongoose';
import { SessionType } from '@flowx/shared/models/session';
import { UserID, UserType } from '@flowx/shared/models/user';
import { isDev } from 'app/common/config';

// @FIXME: fix typings, remove as unknown
const adapter = new MongodbAdapter(
  mongoose.connection.collection('sessions') as unknown as Collection<SessionType>,
  mongoose.connection.collection('users'),
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !isDev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      login: attributes.login,
    };
  },
});

export default fastifyPlugin(
  (fastify: FastifyInstance, _options: FastifyPluginOptions, done) => {
    fastify.addHook('preHandler', async (req, res) => {
      const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');

      if (!sessionId) {
        req.user = null;
        req.session = null;
        return;
      }

      const { session, user } = await lucia.validateSession(sessionId);
      if (session && session.fresh) {
        const cookie = lucia.createSessionCookie(session.id);
        res.setCookie(cookie.name, cookie.value, cookie.attributes);
      }

      if (!session) {
        const cookie = lucia.createBlankSessionCookie();
        res.setCookie(cookie.name, cookie.value, cookie.attributes);
      }

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

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    UserId: UserID;
    DatabaseUserAttributes: UserType;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null;
    session: Session | null;
  }
}
