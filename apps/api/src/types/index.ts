import { Static, Type } from '@sinclair/typebox';
import { UserModel } from 'app/models/user.model';

export interface Database {
  user: UserModel;
}

export type NewUserRouteScheme = Static<typeof NewUserRouteScheme>;
export const NewUserRouteScheme = Type.Object({
  login: Type.String(),
  password: Type.String(),
  avatar: Type.Optional(Type.String()),
});

export type UserID = Static<typeof UserID>;
export const UserID = Type.Object({ userId: Type.Number() });
