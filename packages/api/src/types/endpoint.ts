import type { z } from 'zod'

interface ApiEndpoint<
  TRequest extends z.ZodType = z.ZodType,
  TResponse extends z.ZodType = z.ZodType,
> {
  method: 'DELETE' | 'GET' | 'POST' | 'PUT'
  path: string
  schema: {
    request: TRequest
    response: TResponse
  }
}

type InferRequest<T extends ApiEndpoint> = z.infer<T['schema']['request']>

type InferResponse<T extends ApiEndpoint> = z.infer<T['schema']['response']>

export type { ApiEndpoint, InferRequest, InferResponse }
