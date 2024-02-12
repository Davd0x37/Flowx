import { Insertable, Selectable, Updateable } from 'kysely';

export interface BaseRepository<T> {
  create: (model: Insertable<T>) => Promise<boolean>;

  read: (id: number) => Promise<Selectable<T> | null>;

  update: (id: number, model: Updateable<T>) => Promise<boolean>;

  remove: (id: number) => Promise<boolean>;

  getAll: () => Promise<Selectable<T>[]>;
}
