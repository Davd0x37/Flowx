import { AppError, UserErrors } from '@flowx/utils'

// @FIXME: add proper types - FastifyRequest is not compatible with preHandler
const authMiddleware = async (request: any) => {
  const id = request?.session?.user_id || request?.user?.id

  if (!id) {
    throw new AppError({
      message: 'User is not logged in',
      name: UserErrors.USER_NOT_LOGGED_IN,
      statusCode: 400,
    })
  }
}

export { authMiddleware }
