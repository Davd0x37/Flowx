import { UserType } from '@flowx/api_types/models/user'
import { type Static, Type } from '@sinclair/typebox'

/**
 * Used in login auth form
 */
export type LoginFormSchemaType = Static<typeof LoginFormSchema>
export const LoginFormSchema = Type.Pick(UserType, ['email', 'password'])

/**
 * Used in register auth form
 */
export type SignupFormSchemaType = Static<typeof SignupFormSchema>
export const SignupFormSchema = Type.Pick(UserType, ['firstName', 'lastName', 'email', 'password'])
