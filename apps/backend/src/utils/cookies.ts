import type { FastifyReply, FastifyRequest } from 'fastify'
import type { OAuthCookieName } from '../types/oauth.types'
import { AUTH_COOKIE_NAME } from '../config/auth'
import { isDev } from './env'

function deleteSessionTokenCookie(request: FastifyRequest): void {
  request.unsignCookie(AUTH_COOKIE_NAME)
}

function getOAuthCookie(
  request: FastifyRequest,
  cookieName: OAuthCookieName,
): string | undefined {
  return request.cookies[cookieName]
}

function getSessionTokenCookie(request: FastifyRequest): string | undefined {
  return request.cookies[AUTH_COOKIE_NAME]
}

function setOAuthCookie(
  reply: FastifyReply,
  cookieName: OAuthCookieName,
  payload: string,
): void {
  reply.setCookie(cookieName, payload, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: '/',
    sameSite: 'lax',
    secure: !isDev,
  })
}

function setSessionTokenCookie(
  reply: FastifyReply,
  token: string,
  expiresAt: Date,
): void {
  reply.setCookie(AUTH_COOKIE_NAME, token, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: !isDev,
  })
}

export {
  deleteSessionTokenCookie,
  getOAuthCookie,
  getSessionTokenCookie,
  setOAuthCookie,
  setSessionTokenCookie,
}
