import type { APP_ERRORS } from './app-error-codes.js'

/**
 * TYPES
 */
interface ErrorSchema<T, ErrorData> {
  data?: ErrorData
  message: string
  name: T
  statusCode?: number
}

/**
 * Implementation
 */
class BaseError<T extends string, ErrorData = unknown> extends Error {
  public data?: ErrorData
  public override message: string
  public override name: T
  public statusCode?: number

  constructor({ data, message, name, statusCode }: ErrorSchema<T, ErrorData>) {
    super(message)

    /**
     * Error type
     */
    this.name = name

    /**
     * String message for error
     */
    this.message = message

    /**
     * Payload data containing error details
     */
    this.data = data

    /**
     * Optional status code for request
     */
    this.statusCode = statusCode
  }
}

class AppError<ErrorData = unknown> extends BaseError<APP_ERRORS, ErrorData> {}

export type { ErrorSchema }

export { AppError, BaseError }
