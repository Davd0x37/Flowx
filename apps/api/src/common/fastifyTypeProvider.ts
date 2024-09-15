import { type TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import type { FastifyTypebox } from '~/types/fastifyTypeBox'

const createFastifyTypeProvider = (fastify: FastifyInstance): FastifyTypebox => {
  return fastify
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>()
}

export { createFastifyTypeProvider }
