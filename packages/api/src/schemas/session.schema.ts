import { z } from 'zod'
import { UserSchema } from './user.schema.js'

type Session = z.infer<typeof SessionSchema>
const SessionSchema = z.object({
  // Expiration date
  expires_at: z.date({
    message: 'INVALID_DATE',
    required_error: 'REQUIRED_FIELD',
  }),

  // Unique session identifier
  id: z
    .string({ required_error: 'REQUIRED_FIELD' })
    .min(20, { message: 'ID_TOO_SHORT' }),

  // User ID - connected with user collection
  user_id: UserSchema.shape.id,
})

export type { Session }

export { SessionSchema }
