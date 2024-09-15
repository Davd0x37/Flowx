import type { SessionType } from '@flowx/api_types/models/session'
import mongoose, { type Model, Schema, model } from 'mongoose'

export const SessionSchema = new Schema<SessionType>(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  } as const,
  {
    _id: false,
  },
)

export const Session: Model<SessionType> =
  mongoose.models.Session ?? model('Session', SessionSchema)
