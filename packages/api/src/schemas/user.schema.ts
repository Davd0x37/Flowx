import { z } from 'zod'

type UserStatus = z.infer<typeof UserStatusSchema>
const UserStatusSchema = z.enum(
  ['ACTIVE', 'IDLE', 'DO_NOT_DISTURB', 'OFFLINE'],
  {
    message: 'INVALID_USER_STATUS',
  },
)

// Roles ADMIN, MODERATOR, USER
type UserRole = z.infer<typeof UserRoleSchema>
const UserRoleSchema = z
  .enum(['ADMIN', 'MODERATOR', 'USER'], {
    message: 'INVALID_USER_ROLE',
  })
  .default('USER')

type User = z.infer<typeof UserSchema>
const UserSchema = z.object({
  // custom image of the user
  avatar: z.nullable(z.string().url({ message: 'INVALID_URL' })),

  // Date of user creation
  createdAt: z.date({
    message: 'INVALID_DATE',
    required_error: 'REQUIRED_FIELD',
  }),

  // User-defined name, mainly used to email in to the app
  email: z
    .string({ required_error: 'REQUIRED_FIELD' })
    .email({ message: 'INVALID_EMAIL' })
    .min(6, { message: 'EMAIL_TOO_SHORT' })
    .max(64, { message: 'EMAIL_TOO_LONG' }),

  // Unique user identifier
  id: z.number({ required_error: 'REQUIRED_FIELD' }).readonly(),

  // Date of last activity
  lastActive: z.date({
    message: 'INVALID_DATE',
    required_error: 'REQUIRED_FIELD',
  }),

  // Secret passphrase known only by the user - stored as hash
  password: z
    .string({ required_error: 'REQUIRED_FIELD' })
    .min(6, { message: 'PASSWORD_TOO_SHORT' })
    .max(128, { message: 'PASSWORD_TOO_LONG' }),

  // User role
  role: UserRoleSchema,

  // User status
  status: UserStatusSchema,

  // Date of last update
  updatedAt: z.date({
    message: 'INVALID_DATE',
    required_error: 'REQUIRED_FIELD',
  }),

  // User name
  username: z
    .string({ required_error: 'REQUIRED_FIELD' })
    .min(3, { message: 'USERNAME_TOO_SHORT' })
    .max(128, { message: 'USERNAME_TOO_LONG' }),
})

export type { User, UserRole, UserStatus }

export { UserRoleSchema, UserSchema, UserStatusSchema }
