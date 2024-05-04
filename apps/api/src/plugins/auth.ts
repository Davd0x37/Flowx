// import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
// import { Lucia } from 'lucia';
// import { Collection, MongoClient } from 'mongodb';

// const client = new MongoClient();
// await client.connect();

// const db = client.db();
// const User = db.collection('users') as Collection<UserDoc>;
// const Session = db.collection('sessions') as Collection<SessionDoc>;

// const adapter = new MongodbAdapter(Session, User);

// interface UserDoc {
//   _id: string;
// }

// interface SessionDoc {
//   _id: string;
//   expires_at: Date;
//   user_id: string;
// }

// export const lucia = new Lucia(adapter, {
//   sessionCookie: {
//     attributes: {
//       // set to `true` when using HTTPS
//       secure: process.env.NODE_ENV === 'production',
//     },
//   },
// });

// // IMPORTANT!
// declare module 'lucia' {
//   interface Register {
//     Lucia: typeof lucia;
//   }
// }

// import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
// import fastifyPlugin from 'fastify-plugin';
// import { db } from 'app/db';

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
//     name: 'mongo',
//     dependencies: ['dotenv', 'base', 'mongo'],
//   },
// );
