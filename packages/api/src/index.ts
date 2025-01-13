// Auth routes
export type * from './api/auth.js'
export * from './api/auth.js'
// Health check route
export type * from './api/healthcheck.js'
export * from './api/healthcheck.js'

// User routes
export type * from './api/user.js'
export * from './api/user.js'

// Fetch helpers
export type { RequestClientParams } from './lib/api-request.js'
export { ApiRequest } from './lib/api-request.js'

// Api response schema
export type * from './schemas/api-response.schema.js'
export * from './schemas/api-response.schema.js'
// Session schema
export type * from './schemas/session.schema.js'
export * from './schemas/session.schema.js'
// User schema
export type * from './schemas/user.schema.js'
export * from './schemas/user.schema.js'

// Endpoint types
export type {
  ApiEndpoint,
  InferRequest,
  InferResponse,
} from './types/endpoint.js'
