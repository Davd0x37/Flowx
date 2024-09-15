import { type Static, type TObject, type TSchema, Type } from '@sinclair/typebox'

const ApiError = <DataType extends TSchema>(T: DataType) =>
  Type.Object({
    /**
     * Optional error code
     * @TODO: change 'code' to 'errorCode' or 'errorType'
     */
    // code: Type.Optional(Type.String()),

    /**
     * Error message with description
     */
    message: Type.String(),

    /**
     * Optional data - may contains additional context
     */
    data: T,
  })

export type GenericApiErrorType = Static<ReturnType<typeof GenericApiError<TObject>>>
export const GenericApiError = <DataType extends TSchema>(T: DataType) => {
  return Type.Object({
    /**
     * Error object
     */
    error: ApiError(T),
    // /**
    //  * Array of error objects
    //  */
    // error: Type.Union([ApiError(T), Type.Array(ApiError(T))]),
  })
}
