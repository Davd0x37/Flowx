import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface UserTable {
  // Used to distinguish the user
  id: Generated<number>;

  // User-defined name, mainly used to login in to the app
  login: string;

  // Secret passphrase known only by the user - stored as hash
  password: string;

  // custom image of the user
  avatar: string | null;

  // Date of registration
  created_at: ColumnType<Date, string | undefined, never>;

  // Date of recent update of the user data
  updated_at: ColumnType<Date, string | undefined, never>;

  // If user is online - @TODO: maybe move this into separate table?
  // isOnline: boolean;

  // Date of last activity
  // lastActive: Date;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;
