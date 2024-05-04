import { Schema, model } from 'mongoose';

export type UserID = Schema.Types.ObjectId;
export type UserIDObject = { userId: UserID };

export interface IUser {
  // User-defined name, mainly used to login in to the app
  login: string;

  // Secret passphrase known only by the user - stored as hash
  password: string;

  // custom image of the user
  avatar?: string;

  // If user is online - @TODO: maybe move this into separate table?
  isOnline: boolean;

  // Date of last activity
  lastActive: Date;
}

export const UserSchema = new Schema<IUser>(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    isOnline: { type: Boolean, default: false, required: false },
    lastActive: { type: Date, default: new Date(), required: false },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', UserSchema);
