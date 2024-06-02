import { TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { FastifyTypebox } from 'app/types/fastifyTypeBox';

const createFastifyTypeProvider = (fastify: FastifyInstance): FastifyTypebox => {
  return fastify
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>();
};

export { createFastifyTypeProvider };
