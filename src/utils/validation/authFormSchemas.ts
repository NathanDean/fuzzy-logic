import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be 8 or more characters long'),
    confirmPassword: z.string(),
    subscribe: z.preprocess((val) => val === 'on', z.boolean().optional()),
    'cf-turnstile-response': z.string({
      required_error: 'CAPTCHA verification failed',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be 8 or more characters long'),
  'cf-turnstile-response': z.string({
    required_error: 'CAPTCHA verification failed',
  }),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  'cf-turnstile-response': z.string({
    required_error: 'CAPTCHA verification failed',
  }),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(8, 'Password must be 8 or more characters long'),
  confirmPassword: z.string(),
});
