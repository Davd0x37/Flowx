import type {
  LoginRouteRequest,
  LoginRouteResponse,
  LogoutRouteRequest,
  LogoutRouteResponse,
  RegisterRouteRequest,
  RegisterRouteResponse,
  ResetPasswordRouteRequest,
  ResetPasswordRouteResponse,
} from '@flowx/api'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { AppError, ImplementationErrors } from '@flowx/utils'
import type AuthService from '../services/auth.service'
import type SessionService from '../services/session.service'
import { deleteSessionTokenCookie } from '../utils/cookies'

class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Validates the request body, logs in a user, sets a session, and returns the user information
   *
   * @param {FastifyRequest} request Fastify request object
   * @param {FastifyReply} reply Fastify reply object
   * @returns {Promise<LoginRouteResponse>} User information DTO
   */
  async loginUserHandler(
    request: FastifyRequest<{ Body: LoginRouteRequest }>,
    reply: FastifyReply,
  ): Promise<LoginRouteResponse> {
    // Validates the user credentials and returns data if user exists
    const loginUserResult = await this.authService.loginUser(request.body)
    // Creates a session for the user
    await this.sessionService.createSession(reply, loginUserResult.id)

    return loginUserResult
  }

  /**
   * Logs out a user
   *
   * @param {FastifyRequest} request Fastify request object
   * @returns {Promise<LogoutRouteResponse>} Logout message
   */
  async logoutUserHandler(
    request: FastifyRequest<{ Body: LogoutRouteRequest }>,
  ): Promise<LogoutRouteResponse> {
    deleteSessionTokenCookie(request)

    return {
      message: 'Logged out successfully',
    }
  }

  /**
   * Registers a new user
   *
   * @param {FastifyRequest} request Fastify request object
   * @param {FastifyReply} reply Fastify reply object
   * @returns {Promise<RegisterRouteResponse>} User information DTO
   */
  async registerUserHandler(
    request: FastifyRequest<{ Body: RegisterRouteRequest }>,
    reply: FastifyReply,
  ): Promise<RegisterRouteResponse> {
    // Registers a new user
    const registerUserResult = await this.authService.registerUser(request.body)
    // Creates a session for the user
    await this.sessionService.createSession(reply, registerUserResult.id)

    return registerUserResult
  }

  /**
   * Resets the user's password
   *
   * @param {FastifyRequest} _request Fastify request object
   * @returns {Promise<ResetPasswordRouteResponse>} Empty response
   */
  async resetPasswordHandler(
    _request: FastifyRequest<{ Body: ResetPasswordRouteRequest }>,
  ): Promise<ResetPasswordRouteResponse> {
    throw new AppError({
      message: 'Not implemented',
      name: ImplementationErrors.NOT_IMPLEMENTED,
      statusCode: 501,
    })
  }
}

export default AuthController
