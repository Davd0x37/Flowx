import { MongoId } from '../types/mongoose';
import { Static, Type } from '@sinclair/typebox';

export type SessionType = Static<typeof SessionType>;
export const SessionType = Type.Object({
  // Record id - must be type string
  _id: Type.String(),

  // User ID - connected with user collection
  user_id: MongoId,

  // Expiration date
  expires_at: Type.Date(),
});
