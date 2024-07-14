import { Static, Type } from '@sinclair/typebox';

// export type UserID = Schema.Types.ObjectId;
export type UserID = string;

export type UserType = Static<typeof UserType>;
export const UserType = Type.Object({
  // Non-unique user identifier - must be a string because lucia auth doesn't support ObjectId
  _id: Type.String({ readOnly: true }),

  // User name
  firstName: Type.String({
    minLength: 3,
    maxLength: 128,
  }),

  // User last name
  lastName: Type.String({
    minLength: 3,
    maxLength: 128,
  }),

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
  lastActive: Type.String(), // Type.Date(),
});

// Used in LuciaAuth
export interface IUserAuth {
  _id: UserID;
}
