import { GenericApiError } from '../../generics';
import { UserType } from '../../models/user';
import { Static, Type } from '@sinclair/typebox';

/**
 * Get current user
 */
export const getAccountDataServerEndpoint = '/me';
export const getAccountDataClientEndpoint = () => `/me`;

// Success response types
export type GetAccountDataSuccessResponse = Static<typeof GetAccountDataSuccessResponse>;
export const GetAccountDataSuccessResponse = Type.Object({
  /**
   * User data
   */
  data: UserType,
});

// Error response type
export type GetAccountDataErrorResponse = Static<typeof GetAccountDataErrorResponse>;
export const GetAccountDataErrorResponse = GenericApiError(Type.Optional(Type.Never()));
