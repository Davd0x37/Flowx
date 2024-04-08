import { Kysely, PostgresDialect } from 'kysely';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';
import { type Database } from 'app/types';

export const __dbDirname = fileURLToPath(new URL('.', import.meta.url));

const { DATABASE_URI, DATABASE_NAME, DATABASE_USER } = process.env;

const postgresDialect = new PostgresDialect({
  pool: new Pool({
    database: DATABASE_NAME,
    host: DATABASE_URI,
    user: DATABASE_USER,
    port: 5434,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect: postgresDialect,
});

export type DBType = typeof db;
