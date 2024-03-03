import redis from '@fastify/redis';
import type { FastifyInstance } from 'fastify';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

// Redis integration
export default (fastify: FastifyInstance) => {
  const redisOptions = {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD,
  };

  fastify.register(redis, redisOptions);
};
