import { __dbDirname, db } from './database';
import { promises as fs } from 'fs';
import { FileMigrationProvider, Migrator } from 'kysely';
import path from 'path';

const migrationFolder = path.resolve(__dbDirname, 'migrations');

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder,
  }),
});

const [, , mode] = process.argv;

const { error, results } = mode === '--rollback' ? await migrator.migrateDown() : await migrator.migrateToLatest();

results?.forEach((it) => {
  if (it.status === 'Success') {
    console.log(`migration "${it.migrationName}" was executed successfully`);
  } else if (it.status === 'Error') {
    console.error(`failed to execute migration "${it.migrationName}"`);
  }
});

if (error) {
  console.error('failed to migrate');
  console.error(error);
  process.exit(1);
}

await db.destroy();
