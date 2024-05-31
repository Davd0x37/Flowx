import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Lucia, type Session, type User } from 'lucia';
import mongoose from 'mongoose';
import { UserID, UserType } from '@flowx/shared/models/user';
import { isDev } from 'app/common/config';

const adapter = new MongodbAdapter(
  // @ts-expect-error @FIXME: fix typings
  mongoose.connection.collection('sessions'),
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
      email: attributes.email,
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
    DatabaseUserAttributes: Pick<UserType, 'email'>;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null;
    session: Session | null;
  }
}
