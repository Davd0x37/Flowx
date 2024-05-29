import { Static, Type } from '@sinclair/typebox';
import type { Schema } from 'mongoose';

export type UserID = Schema.Types.ObjectId;

export type UserType = Static<typeof UserType>;
export const UserType = Type.Object({
  // User-defined name, mainly used to email in to the app
  email: Type.String({
    minLength: 6,
    maxLength: 64,
  }),

  // Secret passphrase known only by the user - stored as hash
  password: Type.String({
    minLength: 6,
    maxLength: 128,
  }),

  // custom image of the user
  avatar: Type.Optional(
    Type.String({
      format: 'uri',
    }),
  ),

  isOnline: Type.Boolean(),

  // Date of last activity
  lastActive: Type.Date(),
});

// Used in LuciaAuth
export interface IUserAuth {
  _id: UserID;
}
