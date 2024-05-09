import { Static, Type } from '@sinclair/typebox';
import type { Schema } from 'mongoose';

export type UserID = Schema.Types.ObjectId;
export type UserIDObject = { userId: UserID };

export type UserType = Static<typeof UserType>;
export const UserType = Type.Object({
  // User-defined name, mainly used to login in to the app
  login: Type.String({
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

  // If user is online - @TODO: maybe move this into separate table?
  isOnline: Type.Boolean(),

  // Date of last activity
  lastActive: Type.Date(),
});

// Used in LuciaAuth
export interface IUserAuth {
  _id: UserID;
}

/**
 * Used in web auth form
 */
export type UserLoginForm = Static<typeof UserLoginForm>;
export const UserLoginForm = Type.Pick(UserType, ['login', 'password']);

// Register confirm password
export type UserRegisterConfirmPassword = Static<typeof UserRegisterConfirmPassword>;
export const UserRegisterConfirmPassword = Type.Object({
  confirmPassword: Type.Index(UserType, ['password']),
});

// Register form with confirm password
export type UserRegisterForm = Static<typeof UserRegisterForm>;
export const UserRegisterForm = Type.Composite([UserLoginForm, UserRegisterConfirmPassword]);
