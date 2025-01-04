// Auth routes
export type {
  LoginRouteRequest,
  LoginRouteResponse,
  LogoutRouteRequest,
  LogoutRouteResponse,
  RegisterRouteRequest,
  RegisterRouteResponse,
  ResetPasswordRouteRequest,
  ResetPasswordRouteResponse,
} from './api/auth.js'
export {
  LoginRoute,
  LogoutRoute,
  RegisterRoute,
  ResetPasswordRoute,
} from './api/auth.js'
// Health check route
export type {
  HealthCheckRouteRequest,
  HealthCheckRouteResponse,
} from './api/healthcheck.js'
export { HealthCheckRoute } from './api/healthcheck.js'

// User routes
export type {
  DeleteMeRouteRequest,
  DeleteMeRouteResponse,
  GetMeRouteRequest,
  GetMeRouteResponse,
  UpdateMeRouteRequest,
  UpdateMeRouteResponse,
  UpdateStatusRouteRequest,
  UpdateStatusRouteResponse,
} from './api/user.js'
export {
  DeleteMeRoute,
  GetMeRoute,
  UpdateMeRoute,
  UpdateStatusRoute,
} from './api/user.js'

// Fetch helpers
export type { RequestClientParams } from './lib/api-request.js'
export { ApiRequest } from './lib/api-request.js'

// Api response schema
export type { ApiErrorResponse } from './schemas/api-response.schema.js'
export { ApiErrorResponseSchema } from './schemas/api-response.schema.js'
// Session schema
export type { Session } from './schemas/session.schema.js'
export { SessionSchema } from './schemas/session.schema.js'
// User schema
export type { User, UserRole, UserStatus } from './schemas/user.schema.js'
export {
  UserRoleSchema,
  UserSchema,
  UserStatusSchema,
} from './schemas/user.schema.js'

// Endpoint types
export type {
  ApiEndpoint,
  InferRequest,
  InferResponse,
} from './types/endpoint.js'
