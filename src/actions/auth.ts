'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/serverClient';

import {
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  updatePasswordSchema,
} from '@/utils/validation/authFormSchemas';
import getAuthError from '@/utils/validation/getAuthError';

import { getCheckoutSession } from './stripe';

export async function signup(formData: FormData): Promise<{ error: string }> {
  const supabase = await createClient();

  // Validate form input with Zod
  const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.confirmPassword?.[0] ||
        validatedFields.error.errors[0].message,
    };
  }

  const {
    email,
    password,
    firstName,
    lastName,
    subscribe,
    'cf-turnstile-response': turnstileToken,
  } = validatedFields.data;

  // Sign up with Supabase Auth
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      captchaToken: turnstileToken,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  // Handle Supabase error
  if (error) {
    console.error('Error signing up:', error);
    const fallbackMessage =
      'Error signing up, please refresh the page and try again.';
    if (error.code) {
      return { error: getAuthError(error.code, fallbackMessage) };
    } else {
      return { error: fallbackMessage };
    }
  }

  if (subscribe) {
    try {
      await supabase

        .from('mailing_list')

        .insert({ email });
    } catch (mailingListError) {
      // Log but don't fail the whole signup
      console.error('Failed to add to mailing list:', mailingListError);
    }
  }

  revalidatePath('/', 'layout');

  redirect('/auth/success?message=signup-successful');
}

type LoginResult = { error: string } | { success: true; redirectUrl: string };

export async function login(
  formData: FormData,
  workshopId?: string | null
): Promise<LoginResult> {
  const supabase = await createClient();

  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    // Return the first error message found
    return {
      error: validatedFields.error.errors[0].message,
    };
  }

  const {
    email,
    password,
    'cf-turnstile-response': turnstileToken,
  } = validatedFields.data;

  // Supabase sign in function
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken: turnstileToken,
    },
  });

  // Handle Supabase error
  if (error) {
    console.error('Error logging in:', error);
    const fallbackMessage =
      'Error logging in, please refresh the page and try again.';
    if (error.code) {
      return { error: getAuthError(error.code, fallbackMessage) };
    } else {
      return { error: fallbackMessage };
    }
  }

  if (workshopId && data.user) {
    const { user } = data;
    try {
      const result = await getCheckoutSession(workshopId, user.id);
      if ('url' in result && result.url) {
        return { success: true, redirectUrl: result.url };
      }
    } catch {
      console.error('Error creating Stripe checkout session.');
      return { success: true, redirectUrl: '/' };
    }
  }

  return { success: true, redirectUrl: '/' };
}

export async function resetPassword(
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await createClient();

  const validatedFields = resetPasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message,
    };
  }
  const { email, 'cf-turnstile-response': turnstileToken } =
    validatedFields.data;

  // Supabase password reset function
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    captchaToken: turnstileToken,
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
  });

  // Handle Supabase error
  if (error) {
    console.error('Error requesting password reset:', error);
    const fallbackMessage =
      'Error requesting password reset, please refresh the page and try again.';
    if (error.code) {
      return { error: getAuthError(error.code, fallbackMessage) };
    } else {
      return { error: fallbackMessage };
    }
  }

  revalidatePath('/', 'layout');
  redirect('/auth/success?message=password-reset-request-successful');
}

export async function updatePassword(
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await createClient();

  const validatedFields = updatePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.confirmPassword?.[0] ||
        validatedFields.error.errors[0].message,
    };
  }
  const { password } = validatedFields.data;
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  // Handle Supabase error
  if (error) {
    console.error('Error updating password:', error);
    const fallbackMessage =
      'Error updating password, please refresh the page and try again.';
    if (error.code) {
      return { error: getAuthError(error.code, fallbackMessage) };
    } else {
      return { error: fallbackMessage };
    }
  }

  revalidatePath('/', 'layout');

  redirect('/auth/success?message=password-update-successful');
}
