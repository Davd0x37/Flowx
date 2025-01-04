import { z } from 'zod'
import type {
  ApiEndpoint,
  InferRequest,
  InferResponse,
} from '../types/endpoint.js'
import { UserSchema, UserStatusSchema } from '../schemas/user.schema.js'

/**
 * Get user profile route configuration.
 *
 * @satisfies ApiEndpoint
 */
const GetMeRoute = {
  method: 'GET' as const,
  path: '/me',
  schema: {
    request: z.undefined(),
    response: UserSchema.omit({ password: true }),
  },
} as const satisfies ApiEndpoint
type GetMeRouteRequest = InferRequest<typeof GetMeRoute>
type GetMeRouteResponse = InferResponse<typeof GetMeRoute>

/**
 * Update user profile route configuration.
 *
 * @satisfies ApiEndpoint
 */
const UpdateMeRoute = {
  method: 'PUT' as const,
  path: '/me',
  schema: {
    request: UserSchema.pick({
      avatar: true,
      email: true,
      username: true,
    }),
    response: UserSchema.omit({ password: true }),
  },
} as const satisfies ApiEndpoint
type UpdateMeRouteRequest = InferRequest<typeof UpdateMeRoute>
type UpdateMeRouteResponse = InferResponse<typeof UpdateMeRoute>

/**
 * Delete user profile route configuration.
 *
 * @satisfies ApiEndpoint
 */
const DeleteMeRoute = {
  method: 'DELETE' as const,
  path: '/me',
  schema: {
    request: z.undefined(),
    response: z.boolean(),
  },
} as const satisfies ApiEndpoint
type DeleteMeRouteRequest = InferRequest<typeof DeleteMeRoute>
type DeleteMeRouteResponse = InferResponse<typeof DeleteMeRoute>

/**
 * Update user status route configuration.
 *
 * @satisfies ApiEndpoint
 */
const UpdateStatusRoute = {
  method: 'PUT' as const,
  path: '/me/status',
  schema: {
    request: UserStatusSchema,
    response: z.object({
      status: UserStatusSchema,
    }),
  },
} as const satisfies ApiEndpoint
type UpdateStatusRouteRequest = InferRequest<typeof UpdateStatusRoute>
type UpdateStatusRouteResponse = InferResponse<typeof UpdateStatusRoute>

export type {
  DeleteMeRouteRequest,
  DeleteMeRouteResponse,
  GetMeRouteRequest,
  GetMeRouteResponse,
  UpdateMeRouteRequest,
  UpdateMeRouteResponse,
  UpdateStatusRouteRequest,
  UpdateStatusRouteResponse,
}

export { DeleteMeRoute, GetMeRoute, UpdateMeRoute, UpdateStatusRoute }
