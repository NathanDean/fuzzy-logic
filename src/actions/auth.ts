'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/serverClient';

import getAuthError from '@/utils/validation/getAuthError';

import { getCheckoutSession } from './stripe';

export async function signup(formData: FormData): Promise<{ error: string }> {
  const supabase = await createClient();

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const subscribe = formData.get('subscribe');
  const turnstileToken = formData.get('cf-turnstile-response');

  //Validation

  if (!email || typeof email != 'string') {
    return { error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  if (!password || typeof password != 'string') {
    return { error: 'Password is required' };
  }

  if (password.length < 8) {
    return { error: 'Password must be 8 or more characters long' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords must match' };
  }

  if (!turnstileToken || typeof turnstileToken !== 'string') {
    return { error: 'CAPTCHA verification failed: Missing token' };
  }

  // Sign up with Supabase Auth
  const { error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
    options: {
      captchaToken: turnstileToken,
      data: {
        first_name: firstName as string,
        last_name: lastName as string,
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

  const email = formData.get('email');
  const password = formData.get('password');
  const turnstileToken = formData.get('cf-turnstile-response');

  //Validation

  if (!email || typeof email != 'string') {
    return { error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  if (!password || typeof password != 'string') {
    return { error: 'Password is required' };
  }

  if (password.length < 8) {
    return { error: 'Password must be 8 or more characters long' };
  }

  if (!turnstileToken || typeof turnstileToken !== 'string') {
    return { error: 'CAPTCHA verification failed: Missing token' };
  }

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

  const email = formData.get('email');
  const turnstileToken = formData.get('cf-turnstile-response');

  //Validation

  if (!email || typeof email != 'string') {
    return { error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  if (!turnstileToken || typeof turnstileToken !== 'string') {
    return { error: 'CAPTCHA verification failed: Missing token' };
  }

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
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (!password || typeof password != 'string') {
    return { error: 'Password is required' };
  }

  if (password.length < 8) {
    return { error: 'Password must be 8 or more characters long' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords must match' };
  }

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
