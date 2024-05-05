import { UserID } from './user.model';
import { Schema, SchemaTypes, model, models } from 'mongoose';

export interface ISession {
  // // Record id - must be type string
  _id: string;

  // User ID - connected with user collection
  user_id: UserID;

  // Expiration date
  expires_at: Date;
}

export const SessionSchema = new Schema<ISession>(
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

export const Session = models.Session || model('Session', SessionSchema);
