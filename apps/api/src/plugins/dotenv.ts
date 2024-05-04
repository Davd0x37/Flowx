import Env from '@fastify/env';
import { Static, Type } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { envFilePath } from 'app/config';

const envSchema = Type.Object({
  // MongoDB url with credentials
  DATABASE_URI: Type.String({ readOnly: true, minLength: 10 }),

  // Redis connection details
  REDIS_HOST: Type.String({ readOnly: true }),
  REDIS_PASSWORD: Type.String({ readOnly: true, minLength: 12 }),
  REDIS_PORT: Type.Number({ default: 6379, readOnly: true }),

  // App config
  PORT: Type.Number({ readOnly: true, default: 3000 }),
});

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const { register } = fastify;

    // Env variables in fastify instance
    await register(Env, {
      schema: envSchema,
      dotenv: {
        path: envFilePath,
        debug: process.env.NODE_ENV === 'development',
      },
    });
  },
  {
    name: 'dotenv',
  },
);

type EnvSchema = Static<typeof envSchema>;

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvSchema;
  }
}
