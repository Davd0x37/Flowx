import { GenericApiError } from '../../generics';
import { UserType } from '../../models/user';
import { Static, Type } from '@sinclair/typebox';

/**
 * Register
 */
export const signupServerEndpoint = '/auth/signup';
export const signupClientEndpoint = () => '/auth/signup';

// Body request types
export const SignupBodyRequestSchema = Type.Pick(UserType, [
  'firstName',
  'lastName',
  'email',
  'password',
  'avatar',
]);
export type SignupBodyRequest = Static<typeof SignupBodyRequestSchema>;

// Success response types
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

// Error response type
export type SignupErrorResponse = Static<typeof SignupErrorResponseSchema>;
export const SignupErrorResponseSchema = GenericApiError(
  /**
   * Field that caused the error
   */
  Type.Object({
    field: Type.Optional(Type.String()),
  }),
);
