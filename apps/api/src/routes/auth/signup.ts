import {
  SignupBodyRequestSchema,
  SignupErrorResponseSchema,
  SignupSuccessResponseSchema,
  signupServerEndpoint,
} from '@flowx/api_types/routes/auth'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { generateId } from 'lucia'
import { Argon2id } from 'oslo/password'
import { lucia } from '~/common/auth'
import { createFastifyTypeProvider } from '~/common/fastifyTypeProvider'
import { User } from '~/models/user'

export default async (fastifyInstance: FastifyInstance, _options: FastifyPluginOptions) => {
  const fastify = createFastifyTypeProvider(fastifyInstance)

  /**
   * Create a new user account
   */
  fastify.post(
    signupServerEndpoint,
    {
      schema: {
        body: SignupBodyRequestSchema,
        response: {
          '2xx': SignupSuccessResponseSchema,
          '4xx': SignupErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { firstName, lastName, email, password, avatar } = request.body

      // Hash before checking if user exists to minimize timing attacks
      const hashedPassword = await new Argon2id().hash(password)

      try {
        const exists = await User.exists({ email: email })
        if (exists) {
          return reply.code(400).send({
            error: {
              message: 'User already exists',
              data: {
                field: 'email',
              },
            },
          })
        }

        const userId = generateId(16)

        const newUser = await User.create({
          _id: userId,
          firstName,
          lastName,
          email,
          avatar,
          password: hashedPassword,
          isOnline: false,
          lastActive: new Date(),
        })

        const session = await lucia.createSession(newUser._id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)

        reply.setCookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return reply.code(200).send({
          message: 'User created',
          data: {
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
          },
        })
      } catch (error) {
        fastify.log.error(error)

        return reply.code(400).send({
          error: {
            message: 'Cannot create an account!',
            data: {},
          },
        })
      }
    },
  )
}
