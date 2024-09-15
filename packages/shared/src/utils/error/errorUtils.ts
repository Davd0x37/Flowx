import type { APP_ERRORS } from './appErrorCodes'

/**
 * TYPES
 */
export interface ErrorParameters<T, ErrorType> {
  name: T
  message: string
  data?: ErrorType
  statusCode?: number
}

export interface DebugParams {
  name: APP_ERRORS
  message: string
}

/**
 * Implementation
 */
export class BaseError<T extends string, ErrorType = unknown> extends Error {
  public name: T
  public message: string
  public data?: ErrorType
  public statusCode?: number

  constructor({ name, message, data, statusCode }: ErrorParameters<T, ErrorType>) {
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

export class AppError<ErrorType = unknown> extends BaseError<APP_ERRORS, ErrorType> {}
