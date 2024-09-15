import { type Static, Type } from '@sinclair/typebox'
import { GenericApiError } from '../../generics'
import { UserType } from '../../models/user'

/**
 * Get all users
 */
export const usersServerEndpoint = '/users'
export const usersClientEndpoint = () => '/users'

// Success response types
export type GetUsersSuccessResponse = Static<typeof GetUsersSuccessResponseSchema>
export const GetUsersSuccessResponseSchema = Type.Object({
  /**
   * List of users
   */
  data: Type.Array(UserType),
})

// Error response type
export type GetUsersErrorResponse = Static<typeof GetUsersErrorResponseSchema>
export const GetUsersErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()))
