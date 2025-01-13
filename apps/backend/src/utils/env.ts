/* eslint-disable perfectionist/sort-objects */
import process from 'node:process'
import { z } from 'zod'

type EnvSchema = z.infer<typeof Env>
const Env = z.object({
  // Auth providers
  // Discord
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  DISCORD_REDIRECT_URI: z.string(),
  // GitHub
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_REDIRECT_URI: z.string(),
  // Api config
  HOST: z.string(),
  NODE_ENV: z.string(),
  // App config
  PORT: z.coerce.number(),
  // Cookies
  COOKIE_SECRET: z.string(),
  // PosgreSQL Configuration
  POSTGRES_URL: z.string(),
  // Redis connection details
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
})

const env = Env.parse(process.env)

// ENV Flags
const isDev = env.NODE_ENV === 'development'

export type { EnvSchema }

export { Env, env, isDev }
