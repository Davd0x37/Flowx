import type { FastifyInstance } from 'fastify';

export type AppFastifyPlugin = (fastify: FastifyInstance) => void;
