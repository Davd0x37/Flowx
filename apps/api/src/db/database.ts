import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

import { type Database } from 'app/types';

export const __dbDirname = fileURLToPath(new URL('.', import.meta.url));

// @TODO: move database file path to separate file
export const databaseFile =
  (process.env.DATABASE_SQLITE_FILE as string) || resolve(__dbDirname, '../../', 'db_files', 'mydb.sqlite');

export const sqliteDialect = new SqliteDialect({
  database: new SQLite(databaseFile),
});

export const db = new Kysely<Database>({
  dialect: sqliteDialect,
});

export type DBType = typeof db;
