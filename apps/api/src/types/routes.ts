import { Static, Type } from '@sinclair/typebox';

export type NewUserRouteSchemeType = Static<typeof NewUserRouteScheme>;
export const NewUserRouteScheme = Type.Object({
  login: Type.String(),
  password: Type.String(),
  avatar: Type.Optional(Type.String()),
});
