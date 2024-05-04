// import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
// import fastifyPlugin from 'fastify-plugin';
// import { Kysely } from 'kysely';
// import { db } from 'app/db';
// import { type Database } from 'app/types/database';

// declare module 'fastify' {
//   interface FastifyInstance {
//     db: Kysely<Database>;
//   }
// }

// export default fastifyPlugin(
//   async ({ decorate, addHook }: FastifyInstance, _options: FastifyPluginOptions) => {
//     decorate('db', db);

//     addHook('onClose', async (fastifyHookInstance: FastifyInstance) => {
//       if (fastifyHookInstance.db === db) {
//         await fastifyHookInstance.db.destroy();
//       }
//     });
//   },
//   {
//     name: 'kysely',
//     dependencies: ['dotenv', 'base'],
//   },
// );
