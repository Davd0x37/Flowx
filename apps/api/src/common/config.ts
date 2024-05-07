import { resolve } from 'node:path';

// Default route for API
export const API_PREFIX = '/api';

// ENV Flags
export const isDev = process.env.NODE_ENV === 'development';

// Env config paths
const envFile = isDev ? '.env.development' : '.env';
export const envFilePath = resolve(import.meta.dirname, '../../', envFile);
