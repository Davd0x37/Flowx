import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { EnvSchema, env } from 'app/common/env';

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    fastify.decorate('config', env);
  },
  {
    name: 'dotenv',
  },
);

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvSchema;
  }
}
