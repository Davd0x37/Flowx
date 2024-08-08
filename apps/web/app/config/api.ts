import { API_URL } from './constants';

export const getApiEndpoint = (endpoint: string) => `${API_URL}${endpoint}`;
