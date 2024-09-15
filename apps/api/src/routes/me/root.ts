import {
  DeleteAccountErrorResponseSchema,
  DeleteAccountSuccessResponseSchema,
  GetAccountDataErrorResponse,
  GetAccountDataSuccessResponse,
  UpdateAccountBodyRequestSchema,
  UpdateAccountErrorResponseSchema,
  UpdateAccountSuccessResponseSchema,
  deleteAccountServerEndpoint,
  getAccountDataServerEndpoint,
  updateAccountServerEndpoint,
} from '@flowx/api_types/routes/me'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createFastifyTypeProvider } from '~/common/fastifyTypeProvider'
import { User } from '~/models/user'

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance)

  /**
   * Get current user data
   */
  fastify.get(
    getAccountDataServerEndpoint,
    {
      schema: {
        response: {
          '2xx': GetAccountDataSuccessResponse,
          '4xx': GetAccountDataErrorResponse,
        },
      },
    },
    async (request, reply) => {
      const userId = request.session?.userId

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
   * Update current user
   */
  fastify.put(
    updateAccountServerEndpoint,
    {
      schema: {
        body: UpdateAccountBodyRequestSchema,
        response: {
          '2xx': UpdateAccountSuccessResponseSchema,
          '4xx': UpdateAccountErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const userId = request.session?.userId
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
   * Delete current user
   */
  fastify.delete(
    deleteAccountServerEndpoint,
    {
      schema: {
        response: {
          '2xx': DeleteAccountSuccessResponseSchema,
          '4xx': DeleteAccountErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      // @TODO: Return string if session is available or reply with unauthorized with prehandler
      const userId = request.session?.userId

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
