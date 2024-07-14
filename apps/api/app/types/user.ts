import { Type } from '@sinclair/typebox';
import { UserID } from '@flowx/api_types/models/user';

/**
 * @TODO: move to @flowx/api_types
 */
export type UserIDObject = { userId: UserID };
export const UserIDObject = Type.Object({
  userId: Type.String(),
});
