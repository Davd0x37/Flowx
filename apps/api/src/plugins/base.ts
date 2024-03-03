import FastifyFormBody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import type { FastifyInstance } from 'fastify';

// @TODO: add fastify-cors, fastify-rate-limit

export default (fastify: FastifyInstance) => {
  // Register security/logging/other plugins
  fastify.register(helmet);

  // Multipart form body handler
  fastify.register(FastifyFormBody);
};
