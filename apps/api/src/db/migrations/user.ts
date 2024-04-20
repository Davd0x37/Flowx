import { Kysely, sql } from 'kysely';
import { Database } from 'app/types/database';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull().autoIncrement())
    .addColumn('login', 'text', (col) => col.notNull().unique())
    .addColumn('password', 'text', (col) => col.notNull())
    .addColumn('avatar', 'text')
    .addColumn('created_at', 'datetime', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn('updated_at', 'datetime', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user').execute();
}
