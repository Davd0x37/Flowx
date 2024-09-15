import { type Static, Type } from '@sinclair/typebox'
import { GenericApiError } from '../../generics'
import { UserIDObject, UserType } from '../../models/user'

/**
 * Update user by ID
 */
export const updateUserByIdServerEndpoint = '/users/:userId'
export const updateUserByIdClientEndpoint = (userId: string) => `/users/${userId}`

// Params request types
export const UpdateUserByIdParamsRequestSchema = UserIDObject

// Success response types
export type UpdateUserByIdSuccessResponse = Static<typeof UpdateUserByIdSuccessResponseSchema>
export const UpdateUserByIdSuccessResponseSchema = Type.Object({
  /**
   * User data
   */
  data: UserType,
})

// Error response type
export type UpdateUserByIdErrorResponse = Static<typeof UpdateUserByIdErrorResponseSchema>
export const UpdateUserByIdErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()))
