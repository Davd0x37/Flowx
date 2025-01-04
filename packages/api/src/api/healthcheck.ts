import { z } from 'zod'
import type {
  ApiEndpoint,
  InferRequest,
  InferResponse,
} from '../types/endpoint.js'

/**
 * Health check route configuration.
 *
 * @satisfies ApiEndpoint
 */
const HealthCheckRoute = {
  method: 'GET' as const,
  path: '/health-check',
  schema: {
    request: z.undefined(),
    response: z.object({
      message: z.string(),
    }),
  },
} as const satisfies ApiEndpoint
type HealthCheckRouteRequest = InferRequest<typeof HealthCheckRoute>
type HealthCheckRouteResponse = InferResponse<typeof HealthCheckRoute>

export type { HealthCheckRouteRequest, HealthCheckRouteResponse }

export { HealthCheckRoute }
