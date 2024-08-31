import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { type CookieAttributes, Lucia } from 'lucia';
import mongoose from 'mongoose';
import { isDev } from 'app/common/config';

const adapter = new MongodbAdapter(
  mongoose.connection.collection('sessions'),
  mongoose.connection.collection('users'),
);

export type setCookiesFn = (name: string, value: string, attributes: CookieAttributes) => void;

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

export const validateAuth = async (cookies: string | undefined, setCookies: setCookiesFn) => {
  const sessionId = lucia.readSessionCookie(cookies ?? '');

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const cookie = lucia.createSessionCookie(session.id);
    setCookies(cookie.name, cookie.value, cookie.attributes);
  }

  if (!session) {
    const cookie = lucia.createBlankSessionCookie();
    setCookies(cookie.name, cookie.value, cookie.attributes);
  }

  return {
    user,
    session,
  };
};
