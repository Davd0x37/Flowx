import { z } from 'zod'

const ApiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    data: z.unknown(),
    message: z.string(),
  }),
  status: z.literal(false),
})

type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>

export type { ApiErrorResponse }

export { ApiErrorResponseSchema }
