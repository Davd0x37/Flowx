import { GenericApiError } from '../generics';
import { UserType } from '../models/user';
import { Static, Type } from '@sinclair/typebox';

/**
 * Get all users response
 */
export type GetUsersSuccessResponse = Static<typeof GetUsersSuccessResponseSchema>;
export const GetUsersSuccessResponseSchema = Type.Object({
  /**
   * List of users
   */
  data: Type.Array(UserType),
});

export type GetUsersErrorResponse = Static<typeof GetUsersErrorResponseSchema>;
export const GetUsersErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));

/**
 * Get user by ID response
 */
export type GetUserByIdSuccessResponse = Static<typeof GetUserByIdSuccessResponseSchema>;
export const GetUserByIdSuccessResponseSchema = Type.Object({
  /**
   * User data
   */
  data: UserType,
});

export type GetUserByIdErrorResponse = Static<typeof GetUserByIdErrorResponseSchema>;
export const GetUserByIdErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));

/**
 * Update user by ID response
 */
export type UpdateUserByIdSuccessResponse = Static<typeof UpdateUserByIdSuccessResponseSchema>;
export const UpdateUserByIdSuccessResponseSchema = Type.Object({
  /**
   * User data
   */
  data: UserType,
});

export type UpdateUserByIdErrorResponse = Static<typeof UpdateUserByIdErrorResponseSchema>;
export const UpdateUserByIdErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));

/**
 * Delete user by ID response
 */
export type DeleteUserByIdSuccessResponse = Static<typeof DeleteUserByIdSuccessResponseSchema>;
export const DeleteUserByIdSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),
});

export type DeleteUserByIdErrorResponse = Static<typeof DeleteUserByIdErrorResponseSchema>;
export const DeleteUserByIdErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));
