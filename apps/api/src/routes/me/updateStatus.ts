import {
  UpdateStatusBodyRequestSchema,
  UpdateStatusErrorResponseSchema,
  UpdateStatusSuccessResponseSchema,
  updateStatusServerEndpoint,
} from '@flowx/api_types/routes/me/updateStatus'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createFastifyTypeProvider } from '~/common/fastifyTypeProvider'
import { User } from '~/models/user'

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance)

  /**
   * Update current user status
   */
  fastify.put(
    updateStatusServerEndpoint,
    {
      schema: {
        body: UpdateStatusBodyRequestSchema,
        response: {
          '2xx': UpdateStatusSuccessResponseSchema,
          '4xx': UpdateStatusErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const userId = request.session?.userId
      const { status } = request.body

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

        user.status = status

        await user.save()

        await reply.code(200).send({ message: 'Successfully changed user status' })
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
}
