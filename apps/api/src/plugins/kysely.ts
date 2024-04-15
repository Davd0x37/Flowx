import { db } from '../db';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Kysely } from 'kysely';
import { type Database } from 'app/types';

declare module 'fastify' {
  interface FastifyInstance {
    db: Kysely<Database>;
  }
}

export default (fastify$: FastifyInstance) => {
  const kyselyPlugin = fastifyPlugin(
    async (fastify: FastifyInstance) => {
      fastify.decorate('db', db);

      fastify.addHook('onClose', (fastifyHookInstance: FastifyInstance) => {
        if (fastifyHookInstance.db === db) {
          fastifyHookInstance.db.destroy();
        }
      });
    },
    {
      name: 'fastify-kysely-db-plugin',
    },
  );

  fastify$.register(kyselyPlugin);
};
