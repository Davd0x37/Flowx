import type { Session, User } from '@prisma/client'

type SessionValidationResult =
  | { session: null; user: null }
  | { session: Session; user: User }

export type { SessionValidationResult }
