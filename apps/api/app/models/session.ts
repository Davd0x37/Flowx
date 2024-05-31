import mongoose, { Model, Schema, SchemaTypes, model } from 'mongoose';
import { SessionType } from '@flowx/shared/models/session';

export const SessionSchema = new Schema<SessionType>(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
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
);

export const Session: Model<SessionType> =
  mongoose.models.Session ?? model('Session', SessionSchema);
