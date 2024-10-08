// Dev env provided by Vite
export const isDev = import.meta.env.MODE === 'development'

export const SupportedLocales = ['pl', 'en'] as const

// Used in theme provider within main app
export const StorageThemeKey = 'FlowxStorageThemeKey'

// Value used in avatar/sidebar component when acronym can't be generated
export const AVATAR_FALLBACK = 'AV'

// API Configuration
const API_ENABLE_PORT =
  typeof import.meta.env.VITE_API_ENABLE_PORT === 'string'
    ? import.meta.env.VITE_API_ENABLE_PORT
    : 'true'
export const API_PORT = (import.meta.env.VITE_API_PORT as number) ?? 3000
export const API_HOST = (import.meta.env.VITE_API_HOST as string) ?? 'http://localhost'
export const API_PREFIX = '/api'
export const API_URL = `${API_HOST}${API_ENABLE_PORT === 'true' ? `:${API_PORT}` : ''}${API_PREFIX}`
