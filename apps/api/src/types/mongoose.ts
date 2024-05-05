import { Kind, Type } from '@sinclair/typebox';
import { Schema } from 'mongoose';

export const MongoId = Type.Unsafe<Schema.Types.ObjectId>({ [Kind]: 'MongoId' });
