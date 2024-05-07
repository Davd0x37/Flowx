import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { SchemaValidatorType, schemaValidator } from 'app/common/schema';

export default fastifyPlugin(
  async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
    fastify.decorate('schemaValidator', schemaValidator);
    // fastify.decorateRequest('schemaValidator', schemaValidator);
  },
  {
    name: 'schemaValidator',
    dependencies: ['dotenv', 'base'],
  },
);

declare module 'fastify' {
  interface FastifyInstance {
    schemaValidator: SchemaValidatorType;
  }

  // interface FastifyRequest {
  //   schemaValidator: SchemaValidatorType;
  // }
}
