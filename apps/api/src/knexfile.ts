import type { Knex } from 'knex';

export default {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: '../db_files/mydb.sqlite',
    },
    migrations: {
      directory: './db/migrations',
      loadExtensions: ['.ts'],
    },
    seeds: {
      directory: './db/seeds',
      loadExtensions: ['.ts'],
    },
  },
} as { [key: string]: Knex.Config };
