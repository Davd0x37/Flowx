import { UserType } from '@flowx/api_types/models/user'
import {
  DeleteUserByIdErrorResponseSchema,
  DeleteUserByIdParamsRequestSchema,
  DeleteUserByIdSuccessResponseSchema,
  GetUserByIdErrorResponseSchema,
  GetUserByIdParamsRequestSchema,
  GetUserByIdSuccessResponseSchema,
  UpdateUserByIdErrorResponseSchema,
  UpdateUserByIdParamsRequestSchema,
  UpdateUserByIdSuccessResponseSchema,
  deleteUserByIdServerEndpoint,
  getUserByIdServerEndpoint,
  updateUserByIdServerEndpoint,
} from '@flowx/api_types/routes/users'
import { type Static, Type } from '@sinclair/typebox'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createFastifyTypeProvider } from '~/common/fastifyTypeProvider'
import { User } from '~/models/user'

const NewModifiedUser = Type.Pick(UserType, ['email', 'password', 'avatar'])
type NewModifiedUser = Static<typeof NewModifiedUser>

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance)

  /**
   * Get user by ID
   */
  fastify.get(
    getUserByIdServerEndpoint,
    {
      schema: {
        params: GetUserByIdParamsRequestSchema,
        response: {
          '2xx': GetUserByIdSuccessResponseSchema,
          '4xx': GetUserByIdErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params

      const user = await User.findById(userId)
      if (!user) {
        return await reply.status(403).send({
          error: {
            message: 'User not found!',
          },
        })
      }

      await reply.send({ data: user })
    },
  )

  /**
   * Update user by ID
   */
  fastify.put(
    updateUserByIdServerEndpoint,
    {
      schema: {
        body: NewModifiedUser,
        params: UpdateUserByIdParamsRequestSchema,
        response: {
          '2xx': UpdateUserByIdSuccessResponseSchema,
          '4xx': UpdateUserByIdErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params
      const { email, password, avatar } = request.body

      try {
        const user = await User.findById(userId)
        if (!user) {
          await reply.status(403).send({
            error: {
              message: 'Cannot update user!',
            },
          })
          return
        }

        user.email = email
        user.password = password
        user.avatar = avatar

        await user.save()

        await reply.code(200).send({ data: user })
      } catch (error) {
        fastify.log.error(error)

        await reply.status(403).send({
          error: {
            message: 'Cannot update user!',
          },
        })
      }
    },
  )

  /**
   * Delete user by ID
   */
  fastify.delete(
    deleteUserByIdServerEndpoint,
    {
      schema: {
        params: DeleteUserByIdParamsRequestSchema,
        response: {
          '2xx': DeleteUserByIdSuccessResponseSchema,
          '4xx': DeleteUserByIdErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { userId } = request.params

      const user = await User.findByIdAndDelete(userId)
      if (!user) {
        return await reply.status(403).send({
          error: {
            message: 'Cannot delete user!',
          },
        })
      }

      await reply.code(200).send({ message: 'User deleted!' })
    },
  )
}
