import type { UserType } from '@flowx/api_types/models/user'
import mongoose, { type Model, Schema, model } from 'mongoose'

export const UserSchema = new Schema<UserType>(
  {
    _id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    status: { type: String, default: 'active', required: false },
    lastActive: { type: String, default: new Date().toISOString(), required: false },
  },
  { _id: false, timestamps: true },
)

export const User: Model<UserType> = mongoose.models.User ?? model<UserType>('User', UserSchema)
