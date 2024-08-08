import { GenericApiError } from '../../generics';
import { UserIDObject } from '../../models/user';
import { Static, Type } from '@sinclair/typebox';

/**
 * Delete user by ID
 */
export const deleteUserByIdServerEndpoint = '/users/:userId';
export const deleteUserByIdClientEndpoint = (userId: string) => `/users/${userId}`;

// Params request types
export const DeleteUserByIdParamsRequestSchema = UserIDObject;

// Success response types
export type DeleteUserByIdSuccessResponse = Static<typeof DeleteUserByIdSuccessResponseSchema>;
export const DeleteUserByIdSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),
});

// Error response type
export type DeleteUserByIdErrorResponse = Static<typeof DeleteUserByIdErrorResponseSchema>;
export const DeleteUserByIdErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));
