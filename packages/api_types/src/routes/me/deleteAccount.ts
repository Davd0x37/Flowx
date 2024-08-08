import { GenericApiError } from '../../generics';
import { Static, Type } from '@sinclair/typebox';

/**
 * Delete current user
 */
export const deleteAccountServerEndpoint = '/me';
export const deleteAccountClientEndpoint = () => `/me`;

// Success response types
export type DeleteAccountSuccessResponse = Static<typeof DeleteAccountSuccessResponseSchema>;
export const DeleteAccountSuccessResponseSchema = Type.Object({
  /**
   * Success message
   */
  message: Type.String(),
});

// Error response type
export type DeleteAccountErrorResponse = Static<typeof DeleteAccountErrorResponseSchema>;
export const DeleteAccountErrorResponseSchema = GenericApiError(Type.Optional(Type.Never()));
