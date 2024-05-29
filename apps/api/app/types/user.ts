import { Type } from '@sinclair/typebox';
import { UserID } from '@flowx/shared/models/user';
import { MongoId } from '@flowx/shared/types/mongoose';

export type UserIDObject = { userId: UserID };
export const UserIDObject = Type.Object({
  userId: MongoId,
});
