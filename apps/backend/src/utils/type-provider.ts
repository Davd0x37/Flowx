import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyTypeProvider } from '../types/fastify.types'
// import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const createFastifyTypeProvider = (
  fastify: FastifyInstance,
): FastifyTypeProvider => {
  return (
    fastify
      // .setValidatorCompiler(validatorCompiler)
      // .setSerializerCompiler(serializerCompiler)
      .withTypeProvider<ZodTypeProvider>()
  )
}

export { createFastifyTypeProvider }
