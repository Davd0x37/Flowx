// @TODO: move to shared package. Reuse in api and web apps
import { API_PREFIX } from './constants';

export const userAuthLogin = `${API_PREFIX}/auth/login`;
export const userAuthLogout = `${API_PREFIX}/auth/logout`;
export const userAuthSignup = `${API_PREFIX}/auth/signup`;
