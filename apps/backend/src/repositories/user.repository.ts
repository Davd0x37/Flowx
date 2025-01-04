import type { Prisma, PrismaClient, Status, User } from '@prisma/client'

class UserRepository {
  constructor(private readonly db: PrismaClient) {}

  /**
   * Creates a new user in the database and returns it
   *
   * @param {User} user
   * @returns {Promise<User>} Created user object
   */
  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return await this.db.user.create({
      data: user,
    })
  }

  /**
   * Deletes a user by id
   *
   * @param {User['id']} id
   * @returns {Promise<void>}
   */
  async deleteUser(id: User['id']): Promise<void> {
    await this.db.user.delete({
      where: {
        id,
      },
    })
  }

  /**
   * Finds a user by email and returns it
   *
   * @param {User['email']} email
   * @returns {Promise<User | null>} User object
   */
  async findUserByEmail(email: User['email']): Promise<null | User> {
    return await this.db.user.findFirst({
      where: {
        email,
      },
    })
  }

  /**
   * Finds a user by id and returns it
   *
   * @param {User['id']} id
   * @returns {Promise<User | null>} User object
   */
  async findUserById(id: User['id']): Promise<null | User> {
    return await this.db.user.findFirst({
      where: {
        id,
      },
    })
  }

  /**
   * Updates a user's status by id
   *
   * @param {User['id']} id
   * @param {Status} status
   * @returns {Promise<User>} Updated user object
   */
  async updateStatus(id: User['id'], status: Status): Promise<User> {
    return await this.db.user.update({
      data: {
        status,
      },
      where: {
        id,
      },
    })
  }

  /**
   * Updates a user by id
   *
   * @param {User['id']} id
   * @param {Partial<User>} user
   * @returns {Promise<User>} Updated user object
   */
  async updateUser(
    id: User['id'],
    user: Partial<Prisma.UserUpdateInput>,
  ): Promise<User> {
    return await this.db.user.update({
      data: user,
      where: {
        id,
      },
    })
  }
}

export default UserRepository
