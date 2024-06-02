import mongoose, { Model, Schema, model } from 'mongoose';
import { UserType } from '@flowx/shared/models/user';

export const UserSchema = new Schema<UserType>(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    isOnline: { type: Boolean, default: false, required: false },
    lastActive: { type: Date, default: new Date(), required: false },
  },
  { _id: false, timestamps: true },
);

export const User: Model<UserType> = mongoose.models.User ?? model<UserType>('User', UserSchema);
