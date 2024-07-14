import { Static, Type } from '@sinclair/typebox';

export type HealthCheckRouteResponse = Static<typeof HealthCheckRouteResponse>;
export const HealthCheckRouteResponse = Type.Object({
  message: Type.String(),
});
