import { GenericApiError } from '../generics';
import { UserType } from '../models/user';
import { Static, Type } from '@sinclair/typebox';

/**
 * Check session response
 */
export type CheckSessionSuccessResponse = Static<typeof CheckSessionSuccessResponseSchema>;
export const CheckSessionSuccessResponseSchema = Type.Object({
  message: Type.String(),
});

export type CheckSessionErrorResponse = Static<typeof CheckSessionErrorResponseSchema>;
export const CheckSessionErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));

/**
 * Login response
 */
export type LoginSuccessResponse = Static<typeof LoginSuccessResponseSchema>;
export const LoginSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),

  /**
   * User data - email, first name, last name
   */
  data: Type.Pick(UserType, ['email', 'firstName', 'lastName']),
});

export type LoginErrorResponse = Static<typeof LoginErrorResponseSchema>;
export const LoginErrorResponseSchema = GenericApiError(
  /**
   * Field that caused the error
   */
  Type.Object({
    field: Type.Optional(Type.String()),
  }),
);

/**
 * Register response
 */
export type SignupSuccessResponse = Static<typeof SignupSuccessResponseSchema>;
export const SignupSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),

  /**
   * User data - email, first name, last name
   */
  data: Type.Pick(UserType, ['email', 'firstName', 'lastName']),
});

export type SignupErrorResponse = Static<typeof SignupErrorResponseSchema>;
export const SignupErrorResponseSchema = GenericApiError(
  /**
   * Field that caused the error
   */
  Type.Object({
    field: Type.Optional(Type.String()),
  }),
);

/**
 * Logout response
 */
export type LogoutSuccessResponse = Static<typeof LogoutSuccessResponseSchema>;
export const LogoutSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),
});

export type LogoutErrorResponse = Static<typeof LogoutErrorResponseSchema>;
export const LogoutErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));
