import { type Static, Type } from '@sinclair/typebox'
import { GenericApiError } from '../../../generics'
import { UserType } from '../../../models/user'

/**
 * Update current user status
 */
export const updateStatusServerEndpoint = '/me/status'
export const updateStatusClientEndpoint = () => '/me/status'

// Body request types
export const UpdateStatusBodyRequestSchema = Type.Pick(UserType, ['status'])
export type UpdateStatusBodyRequest = Static<typeof UpdateStatusBodyRequestSchema>

// Success response types
export type UpdateStatusSuccessResponse = Static<typeof UpdateStatusSuccessResponseSchema>
export const UpdateStatusSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),
})

// Error response type
export type UpdateStatusErrorResponse = Static<typeof UpdateStatusErrorResponseSchema>
export const UpdateStatusErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()))
