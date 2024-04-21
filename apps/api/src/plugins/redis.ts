import redis from '@fastify/redis';
import type { FastifyInstance } from 'fastify';
import { debug } from '@flowx/shared/utils/errorUtils';
import { AppFastifyPlugin } from 'app/types/fastify.ts';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

// Redis integration
const plugin: AppFastifyPlugin = async (fastify: FastifyInstance) => {
  try {
    const redisOptions = {
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      password: REDIS_PASSWORD,
    };

    await fastify.register(redis, redisOptions);
  } catch (err) {
    if (err instanceof Error) {
      debug({
        name: 'REDIS_ERROR',
        message: `Something went wrong while registering redis plugin: ${err?.message}`,
      });
    }

    throw new Error(`Server error: REDIS_ERROR`);
  }
};

export default plugin;
