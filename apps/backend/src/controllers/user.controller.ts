import type {
  DeleteMeRouteRequest,
  DeleteMeRouteResponse,
  GetMeRouteRequest,
  GetMeRouteResponse,
  UpdateMeRouteRequest,
  UpdateMeRouteResponse,
  UpdateStatusRouteRequest,
  UpdateStatusRouteResponse,
} from '@flowx/api'
import type { FastifyRequest } from 'fastify'
import type UserService from '../services/user.service'

class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Delete current user
   *
   * @param {FastifyRequest} request Fastify request object
   */
  async deleteAccountHandler(
    request: FastifyRequest<{ Body: DeleteMeRouteRequest }>,
  ): Promise<DeleteMeRouteResponse> {
    const userId = request.user!.id

    await this.userService.deleteUser(userId)

    return true
  }

  /**
   * Get current user data
   *
   * @param {FastifyRequest} request Fastify request object
   * @returns {Promise<GetMeRouteResponse>} User information DTO
   */
  async getAccountDataHandler(
    request: FastifyRequest<{ Body: GetMeRouteRequest }>,
  ): Promise<GetMeRouteResponse> {
    // @FIXME: fix fastify types, user is checked in the middleware
    return request.user!
  }

  /**
   * Update current user
   *
   * @param {FastifyRequest} request Fastify request object
   * @returns {Promise<UpdateMeRouteResponse>} User information DTO
   */
  async updateAccountHandler(
    request: FastifyRequest<{ Body: UpdateMeRouteRequest }>,
  ): Promise<UpdateMeRouteResponse> {
    const userId = request.user!.id

    // Update using service
    const updatedUser = await this.userService.updateUser(userId, request.body!)

    return updatedUser
  }

  /**
   * Update status of current user
   *
   * @param {FastifyRequest} request Fastify request object
   * @returns {Promise<UpdateStatusRouteResponse>} User information DTO
   */
  async updateStatusHandler(
    request: FastifyRequest<{ Body: UpdateStatusRouteRequest }>,
  ): Promise<UpdateStatusRouteResponse> {
    const userId = request.user!.id

    // Update using service
    const updatedUser = await this.userService.updateStatus(
      userId,
      request.body as UpdateStatusRouteRequest,
    )

    return updatedUser
  }
}

export default UserController
