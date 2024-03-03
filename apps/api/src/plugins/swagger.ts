import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';

// Swagger integration
export default (fastify: FastifyInstance) => {
  // @TODO: maybe remove options from swagger and keep them only in swagger-ui?
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Flowx API',
        description: 'Flowx API documentation',
        version: '0.0.1',
      },
      host: 'localhost',
      schemes: ['https'],
      consumes: ['application/json', 'multipart/form-data'],
      produces: ['application/json'],
    },
  });

  fastify.register(fastifySwaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (_request, _reply, next) {
        next();
      },
      preHandler: function (_request, _reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
};
