import { env } from './env'

// Default route for API
export const API_PREFIX = '/api'

// ENV Flags
export const isDev = env.NODE_ENV === 'development'
