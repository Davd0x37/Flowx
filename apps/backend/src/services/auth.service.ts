import type { LoginRouteRequest, RegisterRouteRequest } from '@flowx/api'
import type { Prisma, User } from '@prisma/client'
import { AppError, AuthErrors } from '@flowx/utils'
import { hash, verify } from '@node-rs/argon2'
import type UserRepository from '../repositories/user.repository'

class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Logs in a user and returns DTO with user information
   *
   * @param {LoginRouteRequest} input
   * @returns {Promise<User>} User information DTO
   */
  async loginUser(input: LoginRouteRequest): Promise<User> {
    const user = await this.userRepository.findUserByEmail(input.email)
    if (!user) {
      throw new AppError({
        message: 'Invalid credentials',
        name: AuthErrors.INVALID_CREDENTIALS,
        statusCode: 400,
      })
    }

    const validatePassword = await verify(user.password, input.password, {
      memoryCost: 19456,
      outputLen: 32,
      parallelism: 1,
      timeCost: 2,
    })
    if (!validatePassword) {
      throw new AppError({
        message: 'Invalid credentials',
        name: AuthErrors.INVALID_CREDENTIALS,
        statusCode: 400,
      })
    }

    return user
  }

  /**
   * Registers a new user and returns DTO with user information
   *
   * @param {RegisterRouteRequest} input
   * @returns {Promise<RegisterRouteResponse>} User information DTO
   */
  async registerUser(input: RegisterRouteRequest): Promise<User> {
    const { email, password } = input

    // Hash password first before checking if user exists
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      outputLen: 32,
      parallelism: 1,
      timeCost: 2,
    })

    const userExists = await this.userRepository.findUserByEmail(email)
    if (userExists) {
      throw new AppError({
        message: 'Email is not available or blocked',
        name: AuthErrors.EMAILS_IS_NOT_AVAILABLE_OR_BLOCKED,
        statusCode: 400,
      })
    }

    const defaultRole = 'USER'
    const defaultStatus = 'ACTIVE'
    const defaultLastActive = new Date()

    const userData: Prisma.UserCreateInput = {
      ...input,
      lastActive: defaultLastActive,
      password: hashedPassword,
      role: defaultRole,
      status: defaultStatus,
    }

    const user = await this.userRepository.createUser(userData)

    return user
  }
}

export default AuthService
