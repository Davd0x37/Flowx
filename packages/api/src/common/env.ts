import { logger } from './logger';
import { Static, Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export type EnvSchema = Static<typeof EnvSchema>;
export const EnvSchema = Type.Object({
  NODE_ENV: Type.String({ default: 'production', readOnly: true }),

  // MongoDB url with credentials
  DATABASE_URI: Type.String({ readOnly: true, minLength: 10 }),

  // Redis connection details
  REDIS_HOST: Type.String({ readOnly: true }),
  REDIS_PASSWORD: Type.String({ readOnly: true, minLength: 12 }),
  REDIS_PORT: Type.Number({ default: 6379, readOnly: true }),

  // App config
  PORT: Type.Number({ default: 3000, readOnly: true }),
});

export const env = (() => {
  const schemaConverted = Value.Convert(EnvSchema, process.env);
  const check = Value.Check(EnvSchema, schemaConverted);
  if (check) return schemaConverted;
  const error = Value.Errors(EnvSchema, schemaConverted).First();
  logger.error(`Env: Schema conversion error!`);
  if (error) {
    throw new Error(`Env: ${error.message} ${error.path}`);
  }
})() as NonNullable<EnvSchema>;
