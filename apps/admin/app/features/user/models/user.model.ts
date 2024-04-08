// import { z } from 'zod';

// export type UserForm = z.infer<typeof UserForm>;
// export const UserForm = z.object({
//   email: z.string().min(5).max(150).email({ message: 'This is not a valid email' }),
//   password: z.string().min(10).max(120),
// });

// export type UserRegisterForm = z.infer<typeof UserRegisterForm>;
// export const UserRegisterForm = UserForm.extend({
//   confirmPassword: z.string().min(10).max(120),
// }).refine(({ password, confirmPassword }) => password === confirmPassword, {
//   path: ['confirmPassword'],
//   message: "Passwords doesn't match",
// });
