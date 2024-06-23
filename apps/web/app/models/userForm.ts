import { Static, Type } from '@sinclair/typebox';
import { UserType } from '@flowx/shared/models/user';

/**
 * Used in web auth form
 */
export type UserCredentials = Static<typeof UserCredentials>;
export const UserCredentials = Type.Pick(UserType, ['email', 'password']);

// Register confirm password
export type UserRegisterConfirmPassword = Static<typeof UserRegisterConfirmPassword>;
export const UserRegisterConfirmPassword = Type.Object({
  confirmPassword: Type.Index(UserType, ['password']),
});

// Register form with confirm password
export type UserRegisterForm = Static<typeof UserRegisterForm>;
export const UserRegisterForm = Type.Composite([UserCredentials, UserRegisterConfirmPassword]);
