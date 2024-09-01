import { TypeRegistry } from '@sinclair/typebox';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { SchemaTypes, connect } from 'mongoose';
import { MONGO_URI } from 'app/common/url';

// @TODO: maybe move type registration to an outside module? like common directory or lib?
// Register ObjectID type
TypeRegistry.Set('MongoId', (_, value) => value instanceof SchemaTypes.ObjectId);

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    const {
      config: { MONGO_URI_RAW },
    } = fastify;

    try {
      const mongo = await connect(MONGO_URI_RAW || MONGO_URI);

      fastify.addHook('onClose', async () => {
        await mongo.connection.close();
      });
    } catch (err) {
      fastify.log.error(err);

      throw new Error(`Server error: MONGODB_CONFIGURATION`);
    }
  },
  {
    name: 'mongo',
    dependencies: ['dotenv', 'base'],
  },
);
