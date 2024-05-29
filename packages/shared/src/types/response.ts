import { Static, Type } from '@sinclair/typebox';

export type ApiError = Static<typeof ApiError>;
export const ApiError = Type.Object({
  /**
   * Specific error code
   * @TODO: fastify returns status code, should I remove it from here?
   */
  code: Type.Number(),

  /**
   * Optional data - may contains additional context
   */
  data: Type.Optional(Type.Record(Type.String(), Type.Unknown())),

  /**
   * Error message with description
   */
  message: Type.String(),
});

export type ApiResponseWrapper = Static<typeof ApiResponseWrapper>;
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
   * Optional message from API
   */
  message: Type.Optional(Type.String()),

  /**
   * Error data with code/description or null if no error occurred
   */
  error: Type.Optional(Type.Union([ApiError, Type.Null()])),
});
