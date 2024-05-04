import Base from './base';
import Dotenv from './dotenv';
// import Kysely from './kysely';
import Mongo from './mongo';
// import Auth from './auth';
import Redis from './redis';
import Requests from './requests';
import Swagger from './swagger';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const { register } = fastify;

    await register(Dotenv);
    await register(Base);

    await Promise.all([
      register(Mongo),
      // register(Auth),
      register(Redis),
      // register(Kysely),
      register(Requests),
      register(Swagger),
    ]);
  },
  {
    name: 'plugins',
  },
);
