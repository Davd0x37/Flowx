import { Static, Type } from '@sinclair/typebox';

export type UserIDType = Static<typeof UserID>;
export const UserID = Type.Object({ userId: Type.Number() });
