import {
  LoginBodyRequestSchema,
  LoginErrorResponseSchema,
  LoginSuccessResponseSchema,
  loginServerEndpoint,
} from '@flowx/api_types/routes/auth'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { Argon2id } from 'oslo/password'
import { lucia } from '~/common/auth'
import { createFastifyTypeProvider } from '~/common/fastifyTypeProvider'
import { User } from '~/models/user'

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance)

  /**
   * Login user, create session and set session cookie
   */
  fastify.post(
    loginServerEndpoint,
    {
      schema: {
        consumes: ['application/x-www-form-urlencoded'],
        body: LoginBodyRequestSchema,
        response: {
          '2xx': LoginSuccessResponseSchema,
          '4xx': LoginErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      try {
        const user = await User.findOne({ email })
        if (!user) {
          return reply.code(404).send({
            error: {
              message: 'User does not exist!',
              data: {
                field: 'email',
              },
            },
          })
        }

        const validatePassword = await new Argon2id().verify(user.password, password)
        if (!validatePassword) {
          return reply.code(400).send({
            error: {
              message: 'Invalid password',
              data: {
                field: 'password',
              },
            },
          })
        }

        const session = await lucia.createSession(user._id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)

        reply.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return reply.code(200).send({
          message: 'Successfully logged in',
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        })
      } catch (error) {
        fastify.log.error(error)

        return reply.code(400).send({
          error: {
            message: 'Cannot login',
            data: {},
          },
        })
      }
    },
  )
}
