import type { Status, User } from '@prisma/client'
import type UserRepository from '../repositories/user.repository'

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Creates a new user
   *
   * @param {User} user User data
   * @returns {Promise<User>} Created user object
   */
  async createUser(user: User): Promise<User> {
    // @TODO: Validate user input
    return this.userRepository.createUser(user)
  }

  /**
   * Deletes a user by their id
   *
   * @param {User['id']} id User id
   * @returns {Promise<void>}
   */
  async deleteUser(id: User['id']): Promise<void> {
    return this.userRepository.deleteUser(id)
  }

  /**
   * Finds a user by their id
   *
   * @param {User['id']} id User id
   * @returns {Promise<User | null>} User object or null if not found
   */
  async findUserById(id: User['id']): Promise<null | User> {
    return this.userRepository.findUserById(id)
  }

  /**
   * Updates a user's status by their id
   *
   * @param {User['id']} id User id
   * @param {Status} data User data to update
   */
  async updateStatus(id: User['id'], data: Status): Promise<User> {
    return this.userRepository.updateStatus(id, data)
  }

  /**
   * Updates a user by their id
   *
   * @param {User['id']} id User id
   * @param {Partial<User>} data User data to update
   */
  async updateUser(id: User['id'], data: Partial<User>): Promise<User> {
    return await this.userRepository.updateUser(id, data)
  }
}

export default UserService
