import { type Static, Type } from '@sinclair/typebox'

export type UserID = string

export type UserIDObject = { userId: UserID }
export const UserIDObject = Type.Object({
  userId: Type.String(),
})

export type UserStatus = Static<typeof UserStatus>
export const UserStatus = Type.Enum({
  active: 'active',
  idle: 'idle',
  doNotDisturb: 'doNotDisturb',
  offline: 'offline',
})

export type UserType = Static<typeof UserType>
export const UserType = Type.Object({
  // Non-unique user identifier - must be a string because lucia doesn't support ObjectId - for now
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

  status: UserStatus,

  // Date of last activity
  lastActive: Type.String({ format: 'date-time' }),
})

// Used in LuciaAuth
export interface IUserAuth {
  _id: UserID
}
