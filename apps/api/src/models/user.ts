import { Static, Type } from '@sinclair/typebox';
import mongoose, { Model, Schema, model } from 'mongoose';

export type UserID = Schema.Types.ObjectId;
export type UserIDObject = { userId: UserID };

export type UserType = Static<typeof UserType>;
export const UserType = Type.Object({
  // User-defined name, mainly used to login in to the app
  login: Type.String({
    minLength: 6,
    maxLength: 64,
  }),

  // Secret passphrase known only by the user - stored as hash
  password: Type.String({
    minLength: 6,
    maxLength: 128,
  }),

  // custom image of the user
  avatar: Type.Optional(
    Type.String({
      format: 'uri',
    }),
  ),

  // If user is online - @TODO: maybe move this into separate table?
  isOnline: Type.Boolean(),

  // Date of last activity
  lastActive: Type.Date(),
});

// Used in LuciaAuth
export interface IUserAuth {
  _id: UserID;
}

export const UserSchema = new Schema<UserType>(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    isOnline: { type: Boolean, default: false, required: false },
    lastActive: { type: Date, default: new Date(), required: false },
  },
  { timestamps: true },
);

export const User: Model<UserType> = mongoose.models.User || model<UserType>('User', UserSchema);
