import { Static, Type } from '@sinclair/typebox';
import { UserModel } from 'app/models/user.model';

export interface Database {
  user: UserModel;
}

export type NewUserRouteSchemeType = Static<typeof NewUserRouteScheme>;
export const NewUserRouteScheme = Type.Object({
  login: Type.String(),
  password: Type.String(),
  avatar: Type.Optional(Type.String()),
});

export type UserIDType = Static<typeof UserID>;
export const UserID = Type.Object({ userId: Type.Number() });
