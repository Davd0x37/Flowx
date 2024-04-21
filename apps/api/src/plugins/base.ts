import { AppFastifyPlugin } from '../types/fastify.ts';
import FastifyFormBody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import type { FastifyInstance } from 'fastify';
import { debug } from '@flowx/shared/utils/errorUtils';

// @TODO: add fastify-cors, fastify-rate-limit

const plugin: AppFastifyPlugin = async (fastify: FastifyInstance): Promise<void> => {
  try {
    // Register security/logging/other plugins
    await fastify.register(helmet);

    // Multipart form body handler
    await fastify.register(FastifyFormBody);
  } catch (err) {
    if (err instanceof Error) {
      debug({
        name: 'FASTIFY_ERROR',
        message: `Something went wrong while registering fastify middlewares: ${err?.message}`,
      });
    }

    throw new Error(`Server error: FASTIFY_ERROR`);
  }
};

export default plugin;
