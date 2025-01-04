import type { PrismaClient, Session, User } from '@prisma/client'

class SessionRepository {
  constructor(private db: PrismaClient) {}

  /**
   * Creates a session object in the database and returns it
   *
   * @param {Session} data
   * @returns {Promise<Session>} Created session object
   */
  async createSession(data: Session): Promise<Session> {
    return await this.db.session.create({
      data,
    })
  }

  /**
   * Deletes a session by its id
   *
   * @param {Session['id']} id
   * @returns {Promise<void>}
   */
  async deleteSessionById(id: Session['id']): Promise<void> {
    await this.db.session.delete({
      where: {
        id,
      },
    })
  }

  /**
   * Deletes all sessions for a user
   *
   * @param {User['id']} userId
   * @returns {Promise<void>}
   */
  async deleteSessionsByUserId(userId: User['id']): Promise<void> {
    await this.db.session.deleteMany({
      where: {
        user_id: userId,
      },
    })
  }

  /**
   * Finds a session by its id and returns it
   *
   * @param {Session['id']} id
   * @param {boolean} includeUser Whether to include the user object in the result
   * @returns {Promise<Session & {user?: User} | null>} Session object with optional user object
   */
  async findSessionById(
    id: Session['id'],
    includeUser = false,
  ): Promise<null | (Session & { user?: User })> {
    return await this.db.session.findUnique({
      include: {
        user: includeUser,
      },
      where: {
        id,
      },
    })
  }

  /**
   * Updates the expiration date of a session
   *
   * @param {Session['id']} id
   * @param {Date} expiresAt
   * @returns {Promise<Session>} Updated session object
   */
  async updateSessionExpiration(
    id: Session['id'],
    expiresAt: Date,
  ): Promise<Session> {
    return await this.db.session.update({
      data: {
        expiresAt,
      },
      where: {
        id,
      },
    })
  }
}

export default SessionRepository
