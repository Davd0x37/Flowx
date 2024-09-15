import { type Static, Type } from '@sinclair/typebox'
import { GenericApiError } from '../../generics'
import { UserType } from '../../models/user'

/**
 * Login
 */
export const loginServerEndpoint = '/auth/login'
export const loginClientEndpoint = () => '/auth/login'

// Body request types
export const LoginBodyRequestSchema = Type.Pick(UserType, ['email', 'password'])
export type LoginBodyRequest = Static<typeof LoginBodyRequestSchema>

// Success response types
export type LoginSuccessResponse = Static<typeof LoginSuccessResponseSchema>
export const LoginSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),

  /**
   * User data - email, first name, last name
   */
  data: Type.Pick(UserType, ['email', 'firstName', 'lastName']),
})

// Error response type
export type LoginErrorResponse = Static<typeof LoginErrorResponseSchema>
export const LoginErrorResponseSchema = GenericApiError(
  /**
   * Field that caused the error
   */
  Type.Object({
    field: Type.Optional(Type.String()),
  }),
)
