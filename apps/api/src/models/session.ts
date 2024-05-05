import { Static, Type } from '@sinclair/typebox';
import mongoose, { Model, Schema, SchemaTypes, model } from 'mongoose';
import { MongoId } from 'app/types/mongoose';

export type SessionType = Static<typeof SessionType>;
export const SessionType = Type.Object({
  // Record id - must be type string
  _id: Type.String(),

  // User ID - connected with user collection
  user_id: MongoId,

  // Expiration date
  expires_at: Type.Date(),
});

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
  mongoose.models.Session || model('Session', SessionSchema);
