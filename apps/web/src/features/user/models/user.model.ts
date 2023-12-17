import * as z from 'zod';

export const UserForm = z.object({
  email: z.string().min(5).max(150).email('This is not a valid email'),
  password: z.string().min(10).max(120),
});

export const UserRegisterForm = UserForm.extend({
  repeatPassword: z.string().min(10).max(120),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  path: ['repeatPassword'],
  message: "Passwords doesn't match",
});

export type UserFormModel = z.infer<typeof UserForm>;
export type UserRegisterFormModel = z.infer<typeof UserRegisterForm>;
