import { db } from '../db';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Kysely } from 'kysely';
import { debug } from '@flowx/shared/utils/errorUtils';
import { type Database } from 'app/types/database';
import { AppFastifyPlugin } from 'app/types/fastify.ts';

declare module 'fastify' {
  interface FastifyInstance {
    db: Kysely<Database>;
  }
}

const plugin: AppFastifyPlugin = async (fastify$: FastifyInstance): Promise<void> => {
  try {
    await fastify$.register(
      fastifyPlugin(
        (fastify: FastifyInstance) => {
          fastify.decorate('db', db);

          fastify.addHook('onClose', async (fastifyHookInstance: FastifyInstance) => {
            if (fastifyHookInstance.db === db) {
              await fastifyHookInstance.db.destroy();
            }
          });
        },
        {
          name: 'fastify-kysely-db-plugin',
        },
      ),
    );
  } catch (err) {
    if (err instanceof Error) {
      debug({
        name: 'KYSELY_ERROR',
        message: `Something went wrong while registering kysely plugin: ${err?.message}`,
      });
    }

    throw new Error(`Server error: KYSELY_ERROR`);
  }
};

export default plugin;
