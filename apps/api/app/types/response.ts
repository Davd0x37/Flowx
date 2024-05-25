import { Static, Type } from '@sinclair/typebox';

export const ApiError = Type.Object({
  /**
   * Specific error code
   */
  code: Type.Number(),

  /**
   * Error message with description
   */
  message: Type.String(),
});
export type ApiError = Static<typeof ApiError>;

export const ApiResponseWrapper = Type.Object({
  /**
   * Response status. Can be success or error.
   * If an error is returned, then the "error" property will contain the data
   */
  status: Type.Enum({
    success: 'Success',
    error: 'Error',
  }),

  /**
   * Error data with code/description or null if no error occurred
   */
  error: Type.Union([ApiError, Type.Null()]),
});
export type ApiResponseWrapper = Static<typeof ApiResponseWrapper>;
