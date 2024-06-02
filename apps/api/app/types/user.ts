import { Type } from '@sinclair/typebox';
import { UserID } from '@flowx/shared/models/user';

export type UserIDObject = { userId: UserID };
export const UserIDObject = Type.Object({
  userId: Type.String(),
});
