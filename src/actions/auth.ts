'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/serverClient';
import { AuthError } from '@supabase/supabase-js';

import {
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  updatePasswordSchema,
} from '@/utils/validation/authFormSchemas';
import getAuthError from '@/utils/validation/getAuthError';

import { getCheckoutSession } from './stripe';

// Gets specific error message if one exists, otherwise returns default error message
function handleSupabaseError(defaultMessage: string, error: AuthError) {
  console.error(`${defaultMessage}:`, error);
  const message = error.code
    ? getAuthError(error.code, defaultMessage)
    : defaultMessage;
  return { error: message };
}

// Signup action
export async function signup(formData: FormData): Promise<{ error: string }> {
  // Create Supabase client
  const supabase = await createClient();

  // Validate form input with Zod
  const validatedFields = signupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.confirmPassword?.[0] ||
        validatedFields.error.issues[0].message,
    };
  }

  // Extract validated inputs
  const {
    email,
    password,
    firstName,
    lastName,
    subscribe,
    'cf-turnstile-response': turnstileToken,
  } = validatedFields.data;

  // Call Supabase API
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
    return handleSupabaseError('Error signing up', error);
  }

  // Handle mailing list signup
  if (subscribe) {
    try {
      await supabase.from('mailing_list').insert({ email });
    } catch (mailingListError) {
      // Log error without failing signup
      console.error('Failed to add to mailing list:', mailingListError);
    }
  }

  // Redirect user on success
  revalidatePath('/', 'layout');
  redirect('/auth/success?message=signup-successful');
}

// Login action
type LoginResult = { error: string } | { success: true; redirectUrl: string };
export async function login(
  formData: FormData,
  workshopId?: string | null
): Promise<LoginResult> {
  // Create Supabase client
  const supabase = await createClient();

  // Validate form input with Zod
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  // Extract validated inputs
  const {
    email,
    password,
    'cf-turnstile-response': turnstileToken,
  } = validatedFields.data;

  // Call Supabase API
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken: turnstileToken,
    },
  });

  // Handle Supabase error
  if (error) {
    return handleSupabaseError('Error logging in', error);
  }

  // Get Stripe checkout session if user was attempting to book workshop
  if (workshopId && data.user) {
    const { user } = data;
    try {
      const result = await getCheckoutSession(workshopId, user.id);
      if ('url' in result && result.url) {
        // Redirect user to checkout session
        return { success: true, redirectUrl: result.url };
      }
    } catch {
      console.error('Error creating Stripe checkout session.');
      // Redirect user to root if error creating checkout session
      return { success: true, redirectUrl: '/' };
    }
  }

  // Redirect user on success
  return { success: true, redirectUrl: '/' };
}

// Reset password action
export async function resetPassword(
  formData: FormData
): Promise<{ error: string }> {
  // Create Supabase client
  const supabase = await createClient();

  // Validate form input with Zod
  const validatedFields = resetPasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues[0].message,
    };
  }

  // Extract validated inputs
  const { email, 'cf-turnstile-response': turnstileToken } =
    validatedFields.data;

  // Call Supabase API
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    captchaToken: turnstileToken,
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
  });

  // Handle Supabase error
  if (error) {
    return handleSupabaseError('Error requesting password reset', error);
  }

  // Redirect user on success
  revalidatePath('/', 'layout');
  redirect('/auth/success?message=password-reset-request-successful');
}

// Update password action
export async function updatePassword(
  formData: FormData
): Promise<{ error: string }> {
  // Create Supabase client
  const supabase = await createClient();

  // Validate form input with Zod
  const validatedFields = updatePasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.flatten().fieldErrors.confirmPassword?.[0] ||
        validatedFields.error.issues[0].message,
    };
  }

  // Extract validated input
  const { password } = validatedFields.data;

  // Call Supabase API
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  // Handle Supabase error
  if (error) {
    return handleSupabaseError('Error updating password', error);
  }

  // Redirect user on success
  revalidatePath('/', 'layout');
  redirect('/auth/success?message=password-update-successful');
}
