import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Lucia, type Session, type User } from 'lucia';
import { Collection } from 'mongodb';
import mongoose from 'mongoose';
import { isDev } from 'app/config';
import { SessionType } from 'app/models/session';
import { UserID, UserType } from 'app/models/user';

// @FIXME: fix typings, remove as unknown
const adapter = new MongodbAdapter(
  mongoose.connection.collection('sessions') as unknown as Collection<SessionType>,
  // @ts-expect-error fix this too
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
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    // Original author - https://github.com/lucia-auth/lucia/issues/1406#issuecomment-1942424121
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
