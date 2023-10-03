import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'better-sqlite3',
  compileSqlOnError: false,
  connection: {
    filename: process.env.DATABASE_SQLITE_FILE as string,
  },
};

export default config;
