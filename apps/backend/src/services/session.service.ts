import type { Session, User } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type SessionRepository from '../repositories/session.repository'
import type { SessionValidationResult } from '../types/session.types'
import {
  SESSION_DURATION_TIME,
  SESSION_HALF_DURATION_TIME,
} from '../config/auth'
import { getSessionTokenCookie, setSessionTokenCookie } from '../utils/cookies'
import { encodeSessionToken, generateSessionToken } from '../utils/session'

class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  /**
   * Creates a new session for a user and sets the session token cookie in the response
   *
   * @param {FastifyReply} reply Fastify reply object
   * @param {User['id']} userId User id
   * @returns {Promise<void>}
   */
  public async createSession(
    reply: FastifyReply,
    userId: User['id'],
  ): Promise<void> {
    const sessionToken = generateSessionToken()
    const sessionId = encodeSessionToken(sessionToken)
    const sessionData: Session = {
      expiresAt: new Date(Date.now() + SESSION_DURATION_TIME), // 30 days
      id: sessionId,
      user_id: userId,
    }

    const session = await this.sessionRepository.createSession(sessionData)

    setSessionTokenCookie(reply, sessionToken, session.expiresAt)
  }

  /**
   * Deletes a session from the database
   *
   * @param {Session['id']} sessionId Session id
   */
  public async invalidateSession(sessionId: Session['id']): Promise<void> {
    await this.sessionRepository.deleteSessionById(sessionId)
  }

  /**
   * Deletes all sessions for a user from the database
   *
   * @param {User['id']} userId User id
   */
  public async invalidateUserSessions(userId: User['id']): Promise<void> {
    await this.sessionRepository.deleteSessionsByUserId(userId)
  }

  /**
   * Validates the session token from the request and returns the session and user objects if valid, otherwise null
   *
   * @param {FastifyRequest} request Fastify request object
   * @returns {Promise<SessionValidationResult>} Session and user objects
   */
  public async validateAuthRequestEvent(request: FastifyRequest) {
    const token = getSessionTokenCookie(request)
    if (!token) {
      return { session: null, user: null }
    }

    return this.validateSessionToken(token)
  }

  /**
   * Validates a session token and returns the session and user objects if valid, otherwise null
   *
   * @param {string} token Session token
   */
  public async validateSessionToken(
    token: string,
  ): Promise<SessionValidationResult> {
    const sessionId = encodeSessionToken(token)
    const result = await this.sessionRepository.findSessionById(sessionId, true)
    if (result === null) {
      return { session: null, user: null }
    }

    const { user, ...session } = result

    // Delete session if expired
    if (Date.now() >= session.expiresAt.getTime()) {
      await this.sessionRepository.deleteSessionById(sessionId)

      return { session: null, user: null }
    }

    // If user is not defined, return null
    if (!user) {
      return { session: null, user: null }
    }

    // Check 15 days before expiration
    if (
      Date.now() >=
      session.expiresAt.getTime() - SESSION_HALF_DURATION_TIME
    ) {
      session.expiresAt = new Date(Date.now() + SESSION_DURATION_TIME)

      // Save updated expiration date
      await this.sessionRepository.updateSessionExpiration(
        sessionId,
        session.expiresAt,
      )
    }

    return { session, user }
  }
}

export default SessionService
