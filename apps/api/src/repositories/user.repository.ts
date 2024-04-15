import { BaseRepository } from './base.repository';
import { debugError } from '@flowx/shared/utils/errorUtils';
import { db } from 'app/db';
import { NewUser, UpdateUser, User, UserModel } from 'app/models/user.model';

export default class UserRepository implements BaseRepository<UserModel> {
  constructor() {}

  async create(model: NewUser): Promise<boolean> {
    try {
      const createUser = await db.insertInto('user').values(model).executeTakeFirstOrThrow();

      return !!createUser;
    } catch (err) {
      debugError(err);
      return false;
    }
  }

  async read(id: number): Promise<User | null> {
    try {
      return await db.selectFrom('user').where('id', '=', id).selectAll().executeTakeFirstOrThrow();
    } catch (err) {
      debugError(err);
      return null;
    }
  }

  async update(id: number, model: UpdateUser): Promise<boolean> {
    try {
      const req = await db.updateTable('user').where('id', '=', id).set(model).executeTakeFirstOrThrow();

      return req.numUpdatedRows > 0;
    } catch (err) {
      debugError(err);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const req = await db.deleteFrom('user').where('id', '=', id).executeTakeFirstOrThrow();

      return req.numDeletedRows > 0;
    } catch (err) {
      debugError(err);
      return false;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await db.selectFrom('user').selectAll().execute();
    } catch (err) {
      debugError(err);
      return [];
    }
  }

  async userExists(id: number): Promise<boolean> {
    try {
      const user = await db.selectFrom('user').where('id', '=', id).select(['created_at']).executeTakeFirstOrThrow();

      return !!user;
    } catch (err) {
      debugError(err);
      return false;
    }
  }
}
