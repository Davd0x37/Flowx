import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';
import { debug } from '@flowx/shared/utils/errorUtils';
import { AppFastifyPlugin } from 'app/types/fastify.ts';

// Swagger integration
const plugin: AppFastifyPlugin = async (fastify: FastifyInstance) => {
  try {
    // @TODO: maybe remove options from swagger and keep them only in swagger-ui?
    await fastify.register(fastifySwagger, {
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

    await fastify.register(fastifySwaggerUI, {
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
  } catch (err) {
    if (err instanceof Error) {
      debug({
        name: 'SWAGGER_ERROR',
        message: `Something went wrong while registering swagger middleware: ${err?.message}`,
      });
    }

    throw new Error(`Server error: SWAGGER_ERROR`);
  }
};

export default plugin;
