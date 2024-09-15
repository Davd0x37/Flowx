import { type Static, Type } from '@sinclair/typebox'

/**
 * Healthcheck
 */
export const healthcheckServerEndpoint = '/healthcheck'
export const healthcheckClientEndpoint = () => '/healthcheck'

// Response types
export type HealthCheckRouteResponse = Static<typeof HealthCheckRouteResponse>
export const HealthCheckRouteResponse = Type.Object({
  message: Type.String(),
})
