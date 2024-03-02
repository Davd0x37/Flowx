import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { createYoga } from 'graphql-yoga';

export default async (fastify: FastifyInstance, _options: FastifyPluginOptions) => {
  // Create a new instance of GraphQL Yoga
  const yoga = createYoga<{
    req: FastifyRequest;
    reply: FastifyReply;
  }>({
    // Attach graphql logger to fastify logger
    logging: {
      debug: (...args) => args.forEach((arg) => fastify.log.debug(arg)),
      info: (...args) => args.forEach((arg) => fastify.log.info(arg)),
      warn: (...args) => args.forEach((arg) => fastify.log.warn(arg)),
      error: (...args) => args.forEach((arg) => fastify.log.error(arg)),
    },
  });

  fastify.route({
    // Set graphql endpoint
    url: yoga.graphqlEndpoint,
    // Allowed methods for graphql
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      // Pass fastify request and reply to graphql yoga
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply,
      });

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      reply.send(response.body);

      return reply;
    },
  });

  // Forward multipart form data to graphql yoga
  fastify.addContentTypeParser('multipart/form-data', {}, (_req, _payload, done) => done(null));
};
