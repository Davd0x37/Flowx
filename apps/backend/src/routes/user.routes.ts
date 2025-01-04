import type { FastifyInstance } from 'fastify'
import {
  DeleteMeRoute,
  GetMeRoute,
  UpdateMeRoute,
  UpdateStatusRoute,
} from '@flowx/api'
import UserController from '../controllers/user.controller'
import prisma from '../db/connect'
import { authMiddleware } from '../middlewares/auth.middleware'
import UserRepository from '../repositories/user.repository'
import UserService from '../services/user.service'
import { createFastifyTypeProvider } from '../utils/type-provider'

export default (fastifyInstance: FastifyInstance) => {
  // Fastify with zod type provider
  const fastify = createFastifyTypeProvider(fastifyInstance)

  const db = prisma
  // Repositories
  const userRepository = new UserRepository(db)
  // Services
  const userService = new UserService(userRepository)
  // Controllers
  const userController = new UserController(userService)

  /**
   * Get current user data route
   */
  fastify.route({
    handler: userController.getAccountDataHandler.bind(userController),
    method: GetMeRoute.method,
    preHandler: [authMiddleware],
    schema: {
      response: {
        200: GetMeRoute.schema.response,
      },
    },
    url: GetMeRoute.path,
  })

  /**
   * Update current user route
   */
  fastify.route({
    handler: userController.updateAccountHandler.bind(userController),
    method: UpdateMeRoute.method,
    preHandler: [authMiddleware],
    schema: {
      body: UpdateMeRoute.schema.request,
      response: {
        200: UpdateMeRoute.schema.response,
      },
    },
    url: UpdateMeRoute.path,
  })

  /**
   * Delete current user route
   */
  fastify.route({
    handler: userController.deleteAccountHandler.bind(userController),
    method: DeleteMeRoute.method,
    preHandler: [authMiddleware],
    schema: {
      body: DeleteMeRoute.schema.request,
      response: {
        200: DeleteMeRoute.schema.response,
      },
    },
    url: DeleteMeRoute.path,
  })

  /**
   * Update current user status route
   */
  fastify.route({
    handler: userController.updateStatusHandler.bind(userController),
    method: UpdateStatusRoute.method,
    preHandler: [authMiddleware],
    schema: {
      body: UpdateStatusRoute.schema.request,
      response: {
        200: UpdateStatusRoute.schema.response,
      },
    },
    url: UpdateStatusRoute.path,
  })
}
