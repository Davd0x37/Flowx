import type { FastifyError, FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import knexBuild, { Knex } from 'knex';
import knexConfig from '../config/knex';

// Declare additonal knex property in global Fastify type using declaration merging
declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex;
  }
}

// const knexPlugin: FastifyPluginAsync<Knex.Config> = (fastify: FastifyInstance, options: Knex.Config): Promise<void> => {
const knexPlugin = (fastify: FastifyInstance, options: Knex.Config, done: (error?: FastifyError) => void): void => {
  // if (fastify.knex) done();

  const knexOptions = {
    ...knexConfig,
    ...options,
  };

  const knex = knexBuild(knexOptions);
  fastify.decorate('knex', knex);

  fastify.addHook('onClose', (fastifyHookInstance: FastifyInstance, done: (error?: FastifyError) => void) => {
    if (fastifyHookInstance.knex === knex) {
      fastifyHookInstance.knex.destroy(done);
    }
  });

  done();
};

export default fastifyPlugin(knexPlugin, {
  name: 'fastify-knex-plugin',
});
