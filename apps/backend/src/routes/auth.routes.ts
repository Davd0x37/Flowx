import type { FastifyInstance } from 'fastify'
import {
  CheckSessionRoute,
  LoginRoute,
  LogoutRoute,
  RegisterRoute,
  ResetPasswordRoute,
} from '@flowx/api'
import AuthController from '../controllers/auth.controller'
import prisma from '../db/connect'
import { authMiddleware } from '../middlewares/auth.middleware'
import SessionRepository from '../repositories/session.repository'
import UserRepository from '../repositories/user.repository'
import AuthService from '../services/auth.service'
import SessionService from '../services/session.service'
import { createFastifyTypeProvider } from '../utils/type-provider'

export default (fastifyInstance: FastifyInstance) => {
  // Fastify with zod type provider
  const fastify = createFastifyTypeProvider(fastifyInstance)

  const db = prisma
  // Repositories
  const userRepository = new UserRepository(db)
  const sessionRepository = new SessionRepository(db)
  // Services
  const sessionService = new SessionService(sessionRepository)
  const authService = new AuthService(userRepository)
  // Controllers
  const authController = new AuthController(authService, sessionService)

  /**
   * Login route
   */
  fastify.route({
    handler: authController.loginUserHandler.bind(authController),
    method: LoginRoute.method,
    preHandler: [],
    schema: {
      body: LoginRoute.schema.request,
      response: {
        200: LoginRoute.schema.response,
      },
    },
    url: LoginRoute.path,
  })

  /**
   * Register route
   */
  fastify.route({
    handler: authController.registerUserHandler.bind(authController),
    method: RegisterRoute.method,
    schema: {
      body: RegisterRoute.schema.request,
      response: {
        200: RegisterRoute.schema.response,
      },
    },
    url: RegisterRoute.path,
  })

  /**
   * Logout route
   */
  fastify.route({
    handler: authController.logoutUserHandler.bind(authController),
    method: LogoutRoute.method,
    schema: {
      body: LogoutRoute.schema.request,
      response: {
        200: LogoutRoute.schema.response,
      },
    },
    url: LogoutRoute.path,
  })

  /**
   * Reset password route
   */
  fastify.route({
    handler: authController.resetPasswordHandler.bind(authController),
    method: ResetPasswordRoute.method,
    schema: {
      body: ResetPasswordRoute.schema.request,
      response: {
        200: ResetPasswordRoute.schema.response,
      },
    },
    url: ResetPasswordRoute.path,
  })

  /**
   * Check session route
   * @TODO: move this to /me?
   */
  fastify.route({
    handler: authController.checkSessionHandler.bind(authController),
    method: CheckSessionRoute.method,
    preHandler: [authMiddleware],
    schema: {
      response: {
        200: CheckSessionRoute.schema.response,
      },
    },
    url: CheckSessionRoute.path,
  })
}
