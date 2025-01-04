// Dev env provided by Vite
export const IS_DEV = import.meta.env.MODE === 'development'

// Used in i18n provider within main app
export const SUPPORTED_LOCALES = ['pl', 'en'] as const

// Used in theme provider within main app
export const STORAGE_THEME_KEY = 'FlowxSTORAGE_THEME_KEY'

// Value used in avatar/sidebar component when acronym can't be generated
export const AVATAR_FALLBACK = 'AV'

// API Configuration
export const API_URL = (import.meta.env.VITE_API_URL as string) || '/api'
