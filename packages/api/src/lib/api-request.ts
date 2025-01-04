import type { ZodSchema } from 'zod'
import { AppError, FetchErrors, SchemaErrors } from '@flowx/utils'
import type { ApiErrorResponse } from '../schemas/api-response.schema.js'
import { API_URL } from '../config/constants.js'

interface RequestClientParams {
  apiUrl?: string
  endpoint: string
  options: RequestInit
  schema?: ZodSchema
}

const ApiRequest = async <ResultType>({
  apiUrl = API_URL,
  endpoint,
  options,
  schema,
}: RequestClientParams): Promise<ResultType> => {
  const response = await fetch(`${apiUrl}${endpoint}`, options)

  const responseBody = (await response.json()) as NonNullable<
    ApiErrorResponse | ResultType
  >

  if (schema) {
    try {
      schema.parse(responseBody)
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? error.message
          : 'Unknown error'

      throw new AppError<ApiErrorResponse>({
        data: responseBody as NonNullable<ApiErrorResponse>,
        message: `Response schema validation failed: ${message}`,
        name: SchemaErrors.SCHEMA_VALIDATION_ERROR,
      })
    }
  }

  if (!response.ok) {
    const { status } = response
    // @TODO: dodać parsowanie zodem i rzucanie wyjątku z danymi z response

    throw new AppError<ApiErrorResponse>({
      data: responseBody as NonNullable<ApiErrorResponse>,
      message: 'Error occurred during fetch',
      name: FetchErrors.FETCH_RESPONSE_ERROR,
      statusCode: status,
    })
  }

  if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
    throw new AppError<ApiErrorResponse>({
      data: responseBody as NonNullable<ApiErrorResponse>,
      message: 'Received response was not a JSON response',
      name: FetchErrors.JSON_PARSE_ERROR,
    })
  }

  return responseBody as NonNullable<ResultType>
}

export type { RequestClientParams }

export { ApiRequest }
