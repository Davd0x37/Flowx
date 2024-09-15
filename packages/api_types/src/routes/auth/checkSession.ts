import { type Static, Type } from '@sinclair/typebox'
import { GenericApiError } from '../../generics'

/**
 * Check session
 */
export const checkSessionServerEndpoint = '/auth/check-session'
export const checkSessionClientEndpoint = () => '/auth/check-session'

// Success response types
export type CheckSessionSuccessResponse = Static<typeof CheckSessionSuccessResponseSchema>
export const CheckSessionSuccessResponseSchema = Type.Object({
  message: Type.String(),
})

// Error response type
export type CheckSessionErrorResponse = Static<typeof CheckSessionErrorResponseSchema>
export const CheckSessionErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()))
