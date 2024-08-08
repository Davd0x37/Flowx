import { GenericApiError } from '../../generics';
import { UserType } from '../../models/user';
import { Static, Type } from '@sinclair/typebox';

/**
 * Update current user
 */
export const updateAccountServerEndpoint = '/me';
export const updateAccountClientEndpoint = () => `/me`;

// Body request types
export const UpdateAccountBodyRequestSchema = Type.Pick(UserType, ['email', 'password', 'avatar']);
export type UpdateAccountBodyRequest = Static<typeof UpdateAccountBodyRequestSchema>;

// Success response types
export type UpdateAccountSuccessResponse = Static<typeof UpdateAccountSuccessResponseSchema>;
export const UpdateAccountSuccessResponseSchema = Type.Object({
  /**
   * User data
   */
  data: UserType,
});

// Error response type
export type UpdateAccountErrorResponse = Static<typeof UpdateAccountErrorResponseSchema>;
export const UpdateAccountErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));
