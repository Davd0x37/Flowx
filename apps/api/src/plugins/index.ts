import base from './base';
import kysely from './kysely';
import redis from './redis';
import swagger from './swagger';
import { AppFastifyPlugin } from 'app/types/fastify';

export const Plugins = [base, redis, kysely, swagger] as AppFastifyPlugin[];
