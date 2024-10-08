import { type Static, Type } from '@sinclair/typebox'
import { GenericApiError } from '../../generics'

/**
 * Logout
 */
export const logoutServerEndpoint = '/auth/logout'
export const logoutClientEndpoint = () => '/auth/logout'

// Success response types
export type LogoutSuccessResponse = Static<typeof LogoutSuccessResponseSchema>
export const LogoutSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),
})

// Error response type
export type LogoutErrorResponse = Static<typeof LogoutErrorResponseSchema>
export const LogoutErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()))
