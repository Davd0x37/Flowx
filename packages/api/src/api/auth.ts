import { z } from 'zod'
import type {
  ApiEndpoint,
  InferRequest,
  InferResponse,
} from '../types/endpoint.js'
import { UserSchema } from '../schemas/user.schema.js'

/**
 * Login route configuration for user authentication.
 *
 * @satisfies ApiEndpoint
 */
const LoginRoute = {
  method: 'POST' as const,
  path: '/auth/login',
  schema: {
    request: UserSchema.pick({
      email: true,
      password: true,
    }),
    response: UserSchema.pick({
      email: true,
      id: true,
      username: true,
    }),
  },
} as const satisfies ApiEndpoint
type LoginRouteRequest = InferRequest<typeof LoginRoute>
type LoginRouteResponse = InferResponse<typeof LoginRoute>

/**
 * Register route configuration for user authentication.
 *
 * @satisfies ApiEndpoint
 */
const RegisterRoute = {
  method: 'POST' as const,
  path: '/auth/register',
  schema: {
    request: UserSchema.pick({
      email: true,
      password: true,
      username: true,
    }),
    response: UserSchema.pick({
      email: true,
      username: true,
    }),
  },
} as const satisfies ApiEndpoint
type RegisterRouteRequest = InferRequest<typeof RegisterRoute>
type RegisterRouteResponse = InferResponse<typeof RegisterRoute>

/**
 * Logout route configuration for user authentication.
 *
 * @satisfies ApiEndpoint
 */
const LogoutRoute = {
  method: 'POST' as const,
  path: '/auth/logout',
  schema: {
    request: z.null(),
    response: z.object({
      message: z.string(),
    }),
  },
} as const satisfies ApiEndpoint
type LogoutRouteRequest = InferRequest<typeof LogoutRoute>
type LogoutRouteResponse = InferResponse<typeof LogoutRoute>

/**
 * Reset password route configuration for user authentication.
 *
 * @satisfies ApiEndpoint
 */
const ResetPasswordRoute = {
  method: 'POST' as const,
  path: '/auth/reset-password',
  schema: {
    request: z.undefined(),
    response: z.undefined(),
  },
} as const satisfies ApiEndpoint
type ResetPasswordRouteRequest = InferRequest<typeof ResetPasswordRoute>
type ResetPasswordRouteResponse = InferResponse<typeof ResetPasswordRoute>

/**
 * Check session route configuration
 *
 * @satisfies ApiEndpoint
 */
const CheckSessionRoute = {
  method: 'GET' as const,
  path: '/auth/check-session',
  schema: {
    request: z.undefined(),
    response: z.object({ message: z.string() }),
  },
} as const satisfies ApiEndpoint
type CheckSessionRouteRequest = InferRequest<typeof CheckSessionRoute>
type CheckSessionRouteResponse = InferResponse<typeof CheckSessionRoute>

export type {
  CheckSessionRouteRequest,
  CheckSessionRouteResponse,
  LoginRouteRequest,
  LoginRouteResponse,
  LogoutRouteRequest,
  LogoutRouteResponse,
  RegisterRouteRequest,
  RegisterRouteResponse,
  ResetPasswordRouteRequest,
  ResetPasswordRouteResponse,
}

export {
  CheckSessionRoute,
  LoginRoute,
  LogoutRoute,
  RegisterRoute,
  ResetPasswordRoute,
}
