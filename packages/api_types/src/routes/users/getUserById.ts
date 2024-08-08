import { GenericApiError } from '../../generics';
import { UserIDObject, UserType } from '../../models/user';
import { Static, Type } from '@sinclair/typebox';

/**
 * Get user by ID
 */
// Endpoints
export const getUserByIdServerEndpoint = '/users/:userId';
export const getUserByIdClientEndpoint = (userId: string) => `/users/${userId}`;

// Params request types
export const GetUserByIdParamsRequestSchema = UserIDObject;

// Success response types
export type GetUserByIdSuccessResponse = Static<typeof GetUserByIdSuccessResponseSchema>;
export const GetUserByIdSuccessResponseSchema = Type.Object({
  /**
   * User data
   */
  data: UserType,
});

// Error response type
export type GetUserByIdErrorResponse = Static<typeof GetUserByIdErrorResponseSchema>;
export const GetUserByIdErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));
